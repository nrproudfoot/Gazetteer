<?php
	// API ids/keys/secrets
	$openWeatherId = '4d38fe24ed24d11251cc0c8aead8b3cc';
	$foursquareId = 'QISSDTUMJIE24U035OO4RLJKPUKCCZT3BJVXNYLJF0U2DQVR';
	$foursquareSecret = 'ZJXFOYRVSOJABCIYEP4VU2BJJVNODPKAX5TIDNFGPOYRC1T2';

    $executionStartTime = microtime(true);
    
    if ($_REQUEST['code'] == null) {
		$url='http://api.geonames.org/countryCode?&lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=nrproudfoot';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL,$url);
		$code = curl_exec($ch);
		curl_close($ch);
		$code = substr($code,0,2);
		
	} else {
		$code = $_REQUEST['code'];
    };
    
    // Get slug
	$str = file_get_contents('countries.json');
	$decode = json_decode($str,true);
	$countries = $decode['countries'];
	foreach ($countries as $features){
		if ($features['ISO2'] === $code){
			$slug = $features["Slug"];
		}
	};

	// Get features information from json file
    $str = file_get_contents('countryBorders.json');
	$decode = json_decode($str,true);
	$countries =$decode['features'];
	foreach ($countries as $features){
		if ($features['properties']['iso_a2'] === $code){
			$result = $features;
		}
	}
    $feature = $result;
    $count = 0;
    $largest = null;
if (count($feature['geometry']['coordinates']) > 1){
    foreach ($feature['geometry']['coordinates'] as $island){
        if (count($island,1) > $count){
            $count = count($island,1);
            $largest = $island[0];
        }
    }
    $north = $largest[0][1];
    $south = $largest[0][1];
    $east = $largest[0][0];
    $west = $largest[0][0];
    foreach ($largest as $coord){
        if ($coord[1] > $north){
            $north = $coord[1];
        }
        if ($coord[1] < $south){
            $south = $coord[1];
        }
        if ($coord[0] > $east){
            $east = $coord[0];
        }
        if ($coord[0] < $west){
            $west = $coord[0];
        }
    };
} else {
    $island = $feature['geometry']['coordinates'][0];
    $north = $island[0][1];
    $south = $island[0][1];
    $east = $island[0][0];
    $west = $island[0][0];
    foreach($island as $coord){
        if ($coord[1] > $north){
            $north = $coord[1];
        }
        if ($coord[1] < $south){
            $south = $coord[1];
        }
        if ($coord[0] > $east){
            $east = $coord[0];
        }
        if ($coord[0] < $west){
            $west = $coord[0];
        }
    }
};

    //Create curl resources
    $ch1 = curl_init();
    $ch2 = curl_init();
    $ch3 = curl_init();
    $ch4 = curl_init();
    $ch5 = curl_init();
    $ch6 = curl_init();
    $ch7 = curl_init();
    $ch8 = curl_init();
    $ch9 = curl_init();

    // set url and options
    curl_setopt($ch1, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch1, CURLOPT_URL,'http://api.geonames.org/countryInfoJSON?formatted=true&country=' . $code . '&username=nrproudfoot&style=full');
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_URL,'https://restcountries.eu/rest/v2/alpha/' . $code);
    curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch3, CURLOPT_URL,'https://api.openweathermap.org/data/2.5/weather?q=' . $restcountry['capital'] . ',' . $code . '&appid=' . $openWeatherId);
    curl_setopt($ch4, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch4, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=4deefb944765f83613cdba6e&limit=15&sortByPopularity=1&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch5, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch5, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=52e81612bcbc57f1066b7a21&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch6, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch6, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=4d4b7105d754a06374d81259&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch7, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch7, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch7, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&categoryId=4bf58dd8d48988d116941735&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch8, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch8, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch8, CURLOPT_URL,"http://api.geonames.org/earthquakesJSON?north=" . round($north,1) . "&south=" . round($south,1) . "&east=" . round($east,1) . "&west=" . round($west,1) . "&maxRows=15&username=nrproudfoot");
    curl_setopt($ch9, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch9, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch9, CURLOPT_URL,"https://api.covid19api.com/total/country/" . $code);

    // Create multi handle
    $mh = curl_multi_init();

    // Add handles
    curl_multi_add_handle($mh,$ch1);
    curl_multi_add_handle($mh,$ch2);
    curl_multi_add_handle($mh,$ch3);
    curl_multi_add_handle($mh,$ch4);
    curl_multi_add_handle($mh,$ch5);
    curl_multi_add_handle($mh,$ch6);
    curl_multi_add_handle($mh,$ch7);
    curl_multi_add_handle($mh,$ch8);
    curl_multi_add_handle($mh,$ch9);

    //execute the multi handle
    do {
      $status = curl_multi_exec($mh, $active);
        if ($active) {
           curl_multi_select($mh);
         }
    } while ($active && $status == CURLM_OK);

//close the handles
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);



$country = json_decode(curl_multi_getcontent($ch1),true);
$country = $country['geonames'][0];
$restcountry = json_decode(curl_multi_getcontent($ch2),true);
$weather = json_decode(curl_multi_getcontent($ch3),true);
$foursquare = json_decode(curl_multi_getcontent($ch4),true);
$foursquare = $foursquare['response']['groups'][0]['items'];
$parks = json_decode(curl_multi_getcontent($ch5),true);
$parks = $parks['response']['groups'][0]['items'];
$food = json_decode(curl_multi_getcontent($ch6),true);
$food = $food['response']['groups'][0]['items'];
$bars = json_decode(curl_multi_getcontent($ch7),true);
$bars = $bars['response']['groups'][0]['items'];
$eq = json_decode(curl_multi_getcontent($ch8),true);
$covid = json_decode(curl_multi_getcontent($ch9),true);
$index = array_key_last($covid);
	$latestData = [
		"confirmed" => $covid[$index]['Confirmed'],
		"deaths" => $covid[$index]['Deaths'],
		"weeklyconfirmed" => $covid[$index]['Confirmed'] - $covid[$index-7]['Confirmed'],
		"weeklydeaths" => $covid[$index]['Deaths'] - $covid[$index-7]['Deaths'],
		"dailyavg" => ($covid[$index]['Confirmed'] - $covid[$index-7]['Confirmed']) / 7,
		"dailydeaths" => ($covid[$index]['Deaths'] - $covid[$index-7]['Deaths']) / 7,
    ];

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
    "code" => $code,
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