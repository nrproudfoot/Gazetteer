<?php
	// API ids/keys/secrets
	$openWeatherId = '4d38fe24ed24d11251cc0c8aead8b3cc';
	$foursquareId = 'QISSDTUMJIE24U035OO4RLJKPUKCCZT3BJVXNYLJF0U2DQVR';
	$foursquareSecret = 'ZJXFOYRVSOJABCIYEP4VU2BJJVNODPKAX5TIDNFGPOYRC1T2';

	$executionStartTime = microtime(true);

	// Get features information from json file
    $str = file_get_contents('countryBorders.json');
	$decode = json_decode($str,true);
	$countries =$decode['features'];
	foreach ($countries as $features){
		if ($features['properties']['iso_a2'] === $_REQUEST['code']){
			$result = $features;
		}
	}
	$feature = $result;

	// Get slug
	$str = file_get_contents('countries.json');
	$decode = json_decode($str,true);
	$countries =$decode['countries'];
	foreach ($countries as $features){
		if ($features['ISO2'] === $_REQUEST['code']){
			$slug = $features["Slug"];
		}
	};

	// Get basic country information
	$url='http://api.geonames.org/countryInfoJSON?formatted=true&country=' . $_REQUEST['code'] . '&username=nrproudfoot&style=full';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
	$result = curl_exec($ch);
	$country = json_decode($result,true);
	$country = $country['geonames'][0];

	$resturl='https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['code'];
	curl_setopt($ch, CURLOPT_URL,$resturl);
	$restresult = curl_exec($ch);
	$restcountry = json_decode($restresult,true);


/**/ 
	// Get weather information for capital city
	$url='https://api.openweathermap.org/data/2.5/weather?q=' . $restcountry['capital'] . ',' . $_REQUEST['code'] . '&appid=' . $openWeatherId;
	curl_setopt($ch, CURLOPT_URL,$url);
	$result2 =curl_exec($ch);
	$weather = json_decode($result2, true);
	// history
	$foursquareurl = 'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=4deefb944765f83613cdba6e&limit=15&sortByPopularity=1&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101';
    curl_setopt($ch, CURLOPT_URL,$foursquareurl);
	$foursquareResult =curl_exec($ch);
	$foursquare = json_decode($foursquareResult, true);
	$foursquare = $foursquare['response']['groups'][0]['items'];
	//parks
	$parksurl = 'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=52e81612bcbc57f1066b7a21&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101';
    curl_setopt($ch, CURLOPT_URL,$parksurl);
	$parksResult =curl_exec($ch);
	$parks = json_decode($parksResult, true);
	$parks = $parks['response']['groups'][0]['items'];
	//food
	$foodurl = 'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=4d4b7105d754a06374d81259&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101';
    curl_setopt($ch, CURLOPT_URL,$foodurl);
	$foodResult =curl_exec($ch);
	$food = json_decode($foodResult, true);
	$food = $food['response']['groups'][0]['items'];
	//bars
	$barsurl = 'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=4bf58dd8d48988d116941735&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101';
    curl_setopt($ch, CURLOPT_URL,$barsurl);
	$barsResult =curl_exec($ch);
	$bars = json_decode($barsResult, true);
	$bars = $bars['response']['groups'][0]['items'];

	// Get earthquakes
	$equrl = "http://api.geonames.org/earthquakesJSON?north=" . round($country['north'],1) . "&south=" . round($country['south'],1) . "&east=" . round($country['east'],1) . "&west=" . round($country['west'],1) . "&maxRows=15&username=nrproudfoot"; 
	curl_setopt($ch, CURLOPT_URL,$equrl);
	$eqResult =curl_exec($ch);
	$eq = json_decode($eqResult, true);


	// Get covid stats
	$url = "https://api.covid19api.com/total/country/" . $_REQUEST['code'];
	curl_setopt($ch, CURLOPT_URL,$url);
	$covidResult = curl_exec($ch);
	$covid = json_decode($covidResult, true);
	$index = array_key_last($covid);
	$latestData = [
		"confirmed" => $covid[$index]['Confirmed'],
		"deaths" => $covid[$index]['Deaths'],
		"weeklyconfirmed" => $covid[$index]['Confirmed'] - $covid[$index-7]['Confirmed'],
		"weeklydeaths" => $covid[$index]['Deaths'] - $covid[$index-7]['Deaths'],
		"dailyavg" => ($covid[$index]['Confirmed'] - $covid[$index-7]['Confirmed']) / 7,
		"dailydeaths" => ($covid[$index]['Deaths'] - $covid[$index-7]['Deaths']) / 7,
	];



	curl_close($ch);


	// Format foursquare
	$foursquareVenues = array();
	foreach ($foursquare as $venue){
		$info = [
			"id" => $venue['venue']['id'],
			"name" => $venue['venue']['name'],
			"lat" => $venue['venue']['location']['lat'],
			"lng" => $venue['venue']['location']['lng'],
			"address" => $venue['venue']['location']['formattedAddress'],
			"category" => $venue['venue']['categories'][0]['name'],
			"icon" => $venue['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
		];
		array_push($foursquareVenues, $info);	
	};
	$parksVenues = array();
	foreach ($parks as $park){
		$parkinfo = [
			"id" => $park['venue']['id'],
			"name" => $park['venue']['name'],
			"lat" => $park['venue']['location']['lat'],
			"lng" => $park['venue']['location']['lng'],
			"address" => $park['venue']['location']['formattedAddress'],
			"category" => $park['venue']['categories'][0]['name'],
			"icon" => $park['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
		];
		array_push($parksVenues, $parkinfo);	
	};
	$foodVenues = array();
	foreach ($food as $place){
		$foodinfo = [
			"id" => $place['venue']['id'],
			"name" => $place['venue']['name'],
			"lat" => $place['venue']['location']['lat'],
			"lng" => $place['venue']['location']['lng'],
			"address" => $place['venue']['location']['formattedAddress'],
			"category" => $place['venue']['categories'][0]['name'],
			"icon" => $place['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
		];
		array_push($foodVenues, $foodinfo);	
	};
	$barsVenues = array();
	foreach ($bars as $place){
		$barsinfo = [
			"id" => $place['venue']['id'],
			"name" => $place['venue']['name'],
			"lat" => $place['venue']['location']['lat'],
			"lng" => $place['venue']['location']['lng'],
			"address" => $place['venue']['location']['formattedAddress'],
			"category" => $place['venue']['categories'][0]['name'],
			"icon" => $place['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
		];
		array_push($barsVenues, $barsinfo);	
	};

	// Format data object
    $countryInfo = [
        "name" => $country['countryName'],
        "region" => $country['continentName'],
        "subregion" => $restcountry['subregion'],
        "population" => $country['population'],
	    "currencies" => $restcountry['currencies'],
        "languages" => $restcountry['languages'],
        "flag" => $restcountry['flag'],
		"capital" => $country['capital'],
        "weather" => $weather,
		"features" => $feature,
		"foursquare" => $foursquareVenues,
		"parks" => $parksVenues,
		"food" => $foodVenues,
		"bars" => $barsVenues,
		"covid" => $latestData,
		"allInfo" => $foursquareResult,
		"slug" => $slug,
		"earthquakes" => $eq,
	];
	

	// Format output object
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime). "seconds";
	$output['data'] = $countryInfo;
	
	header('Content-Type: application/json; charset=UTF-8');

	// Send response
	echo json_encode($output); 

?>