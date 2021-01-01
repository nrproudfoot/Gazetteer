<?php

	$executionStartTime = microtime(true) / 1000;

	// Get basic country information
	$url='https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['code'];
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
	$result=curl_exec($ch);
	$rest_countries = json_decode($result,true);
	$url='https://api.openweathermap.org/data/2.5/weather?q=' . $rest_countries['capital'] . ',' . $country['iso_a2'] . '&appid=4d38fe24ed24d11251cc0c8aead8b3cc';
	curl_setopt($ch, CURLOPT_URL,$url);
	$result2 =curl_exec($ch);
	

	
	curl_close($ch);
	
	$weather = json_decode($result2, true);
	

	// Get features information from json file
    $str = file_get_contents('countryBorders.json');
	$decode = json_decode($str,true);
	$countries =$decode['features'];
	foreach ($countries as $country){
		if ($country['properties']['iso_a2'] === $_REQUEST['code']){
			$result = $country;
		}
	}
	$country = $result;

    $country = [
        "name" => $rest_countries['name'],
        "region" => $rest_countries['region'],
        "subregion" => $rest_countries['subregion'],
        "population" => $rest_countries['population'],
        "currencies" => $rest_countries['currencies'],
        "languages" => $rest_countries['languages'],
        "flag" => $rest_countries['flag'],
        "capital" => $rest_countries['capital'],
        "weather" => $weather,
        "features" => $country,
    ];

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $country;
	
	header('Content-Type: application/json; charset=UTF-8');

	// Send response
	echo json_encode($output); 

?>