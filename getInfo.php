<?php
	// API ids/keys/secrets
	$openWeatherId = '4d38fe24ed24d11251cc0c8aead8b3cc';

	$executionStartTime = microtime(true) / 1000;

	// Get basic country information
	$url='https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['code'];
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
	$result = curl_exec($ch);
	$country = json_decode($result,true);

	// Get weather information for capital city
	$url='https://api.openweathermap.org/data/2.5/weather?q=' . $country['capital'] . ',' . $_REQUEST['code'] . '&appid=' . $openWeatherId;
	curl_setopt($ch, CURLOPT_URL,$url);
	$result2 =curl_exec($ch);
	$weather = json_decode($result2, true);

	curl_close($ch);

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

	// Format data object
    $countryInfo = [
        "name" => $country['name'],
        "region" => $country['region'],
        "subregion" => $country['subregion'],
        "population" => $country['population'],
        "currencies" => $country['currencies'],
        "languages" => $country['languages'],
        "flag" => $country['flag'],
        "capital" => $country['capital'],
        "weather" => $weather,
        "features" => $feature,
	];
	

	// Format output object
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $countryInfo;
	
	header('Content-Type: application/json; charset=UTF-8');

	// Send response
	echo json_encode($output); 

?>