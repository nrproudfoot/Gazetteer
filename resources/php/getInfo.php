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
        if(substr($code,0,6)== "ERR:15"){
            echo "Invalid Click Location";
        }
		$code = substr($code,0,2);
		
	} else {
		$code = $_REQUEST['code'];
    };
    
    // Get slug
	$str = file_get_contents('../json/countries.json');
	$decode = json_decode($str,true);
	$countries = $decode['countries'];
	foreach ($countries as $features){
		if ($features['ISO2'] === $code){
			$slug = $features["Slug"];
		}
	};

	// Get features information from json file
    $str = file_get_contents('../json/countryBorders.json');
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
$lon = round((($east + $west) / 2));
$lat = round((($north + $south) / 2));

$newscodes = ["AU","CA","GB","IE","NZ","US","ZA"];
if (in_array($code, $newscodes)){
    $newsurl = "https://newsapi.org/v2/top-headlines?country=" . $code . "&language=en&apiKey=f6a41d3092a94667a34fb5b92aada8bf";
} else {
    $newsurl = "https://newsapi.org/v2/everything?q=" . $slug . "&sortBy=publishedAt&language=en&apiKey=f6a41d3092a94667a34fb5b92aada8bf";
}

    $ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,"https://restcountries.eu/rest/v2/alpha/" . $code);
	$result=curl_exec($ch);
	curl_close($ch);

    $restcountry = json_decode($result,true);
    
    $wikiCapital = explode(" ",$restcountry['capital']);
    $wikiCapital = implode("-",$wikiCapital);

    switch ($slug){
        case "congo-brazzaville":
            $wikiName = "Congo%20Republic";
            break;
        case "congo-kinshasa":
            $wikiName = "Democratic%20Republic%20of%20the%20Congo";
            break;
        case "falkland-islands-malvinas":
            $wikiName = "Falkland%20Islands";
            break;
        case "guinea-bissau":
            $wikiName = $slug;
            break;
        case "korea-south":
            $wikiName = "South%20Korea";
            break;
        case "lao-pdr";
            $wikiName = "Laos";
            break;
        default:
            $wikiName = explode("-",$slug);
            $wikiName = implode("%20",$wikiName);
            break;
    } 
    

    




    //Create curl resources
    $ch2 = curl_init();
    $ch3 = curl_init();
    $ch4 = curl_init();
    $ch5 = curl_init();
    $ch6 = curl_init();
    $ch7 = curl_init();
    $ch8 = curl_init();
    $ch9 = curl_init();
    $ch10 = curl_init();
    $ch11 = curl_init();
    $ch12 = curl_init();
    $ch13 = curl_init();
    $ch14 = curl_init();
    $ch15 = curl_init();
    $ch16 = curl_init();
    
   

    // set url and options
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_URL,'http://api.geonames.org/countryInfoJSON?formatted=true&country=' . $code . '&username=nrproudfoot&style=full');  
    curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch3, CURLOPT_URL,'https://api.openweathermap.org/data/2.5/weather?q=' . $restcountry['capital'] . ',' . $code . '&units=metric&appid=' . $openWeatherId);
    curl_setopt($ch4, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch4, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&locale=en&categoryId=4deefb944765f83613cdba6e&limit=15&sortByPopularity=1&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch5, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch5, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&locale=en&categoryId=52e81612bcbc57f1066b7a21&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch6, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch6, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&locale=en&categoryId=4d4b7105d754a06374d81259&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch7, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch7, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch7, CURLOPT_URL,'https://api.foursquare.com/v2/venues/explore?near=' . $slug . '&locale=en&categoryId=4bf58dd8d48988d116941735&limit=15&client_id=' . $foursquareId . '&client_secret=' . $foursquareSecret . '&v=20210101');
    curl_setopt($ch8, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch8, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch8, CURLOPT_URL,"http://api.geonames.org/earthquakesJSON?north=" . round($north,1) . "&south=" . round($south,1) . "&east=" . round($east,1) . "&west=" . round($west,1) . "&maxRows=15&username=nrproudfoot");
    curl_setopt($ch9, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch9, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch9, CURLOPT_URL,"https://api.covid19api.com/total/country/" . $code);
    curl_setopt($ch10, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch10, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch10, CURLOPT_URL,"http://api.geonames.org/wikipediaSearch?q=" . $wikiCapital . "&maxRows=1&type=json&username=nrproudfoot");
    curl_setopt($ch11, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch11, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch11, CURLOPT_URL,"https://api.meteostat.net/v2/point/climate?lat=" . $lat . "&lon=" .$lon . "&key=6FjvwVri89X19n5k3nbOXZTUUSrt7Iiy");
    curl_setopt($ch12, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch12, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch12, CURLOPT_URL,$newsurl);
    curl_setopt($ch13, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch13, CURLOPT_URL,"https://api.exchangeratesapi.io/latest?base=GBP");
    curl_setopt($ch14, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch14, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch14, CURLOPT_URL,"https://api.exchangeratesapi.io/latest?base=USD");
    curl_setopt($ch15, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch15, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch15, CURLOPT_URL,"https://api.exchangeratesapi.io/latest?base=EUR");
    curl_setopt($ch16, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch16, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch16, CURLOPT_URL,"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" . $wikiName);
    
    // Create multi handle
    $mh = curl_multi_init();

    // Add handles
    curl_multi_add_handle($mh,$ch2);
    curl_multi_add_handle($mh,$ch3);
    curl_multi_add_handle($mh,$ch4);
    curl_multi_add_handle($mh,$ch5);
    curl_multi_add_handle($mh,$ch6);
    curl_multi_add_handle($mh,$ch7);
    curl_multi_add_handle($mh,$ch8);
    curl_multi_add_handle($mh,$ch9);
    curl_multi_add_handle($mh,$ch10);
    curl_multi_add_handle($mh,$ch11);
    curl_multi_add_handle($mh,$ch12);
    curl_multi_add_handle($mh,$ch13);
    curl_multi_add_handle($mh,$ch14);
    curl_multi_add_handle($mh,$ch15);
    curl_multi_add_handle($mh,$ch16);
   


    //execute the multi handle
    do {
      $status = curl_multi_exec($mh, $active);
        if ($active) {
           curl_multi_select($mh);
         }
    } while ($active && $status == CURLM_OK);

//close the handles
curl_multi_remove_handle($mh, $ch2);
curl_multi_remove_handle($mh, $ch3);
curl_multi_remove_handle($mh, $ch4);
curl_multi_remove_handle($mh, $ch5);
curl_multi_remove_handle($mh, $ch6);
curl_multi_remove_handle($mh, $ch7);
curl_multi_remove_handle($mh, $ch8);
curl_multi_remove_handle($mh, $ch9);
curl_multi_remove_handle($mh, $ch10);
curl_multi_remove_handle($mh, $ch11);
curl_multi_remove_handle($mh, $ch12);
curl_multi_remove_handle($mh, $ch13);
curl_multi_remove_handle($mh, $ch14);
curl_multi_remove_handle($mh, $ch15);
curl_multi_remove_handle($mh, $ch16);

curl_multi_close($mh);



$country = json_decode(curl_multi_getcontent($ch2),true);
$all = $country;
$country = $country['geonames'][0];
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
$capitalWiki = json_decode(curl_multi_getcontent($ch10),true);
$monthlyWeather = json_decode(curl_multi_getcontent($ch11),true);
$monthlyWeather = $monthlyWeather['data'];
$news = json_decode(curl_multi_getcontent($ch12),true);
$pound = json_decode(curl_multi_getcontent($ch13),true);
$dollar = json_decode(curl_multi_getcontent($ch14),true);
$euro = json_decode(curl_multi_getcontent($ch15),true);
$wikiCountry = json_decode(curl_multi_getcontent($ch16),true);
$index = array_key_last($covid);
	$latestData = [
		"confirmed" => $covid[$index]['Confirmed'],
		"deaths" => $covid[$index]['Deaths'],
		"weeklyconfirmed" => $covid[$index]['Confirmed'] - $covid[$index-7]['Confirmed'],
		"weeklydeaths" => $covid[$index]['Deaths'] - $covid[$index-7]['Deaths'],
		"dailyavg" => ($covid[$index]['Confirmed'] - $covid[$index-7]['Confirmed']) / 7,
		"dailydeaths" => ($covid[$index]['Deaths'] - $covid[$index-7]['Deaths']) / 7,
    ];
$dates = array();
$dailyDeaths = array();
$dailyCases = array();
for ($i = $index; $i > $index-14 ; $i--){
    $cases = $covid[$i]['Confirmed'] - $covid[$i-1]['Confirmed'];
    $deaths = $covid[$i]['Deaths'] - $covid[$i-1]['Deaths'];
    $date = $covid[$i]['Date'];
    array_unshift($dailyDeaths, $deaths);
    array_unshift($dailyCases, $cases);
    array_unshift($dates, $date);
};
    $capitalWiki = $capitalWiki['geonames'][0];
    

// Format foursquare
$foursquareVenues = array();
foreach ($foursquare as $venue){
    $name = preg_replace("/\&#39;/", "'", $name);
    $name = filter_var($venue['venue']['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    //$name = preg_replace("/[.,\/#!$%\^&\*;:{}=\-_`~()]/", "", $name);
    $name = preg_replace("/\|/", "", $name); 
    $name = preg_replace("/\(/", "", $name);
    $name = preg_replace("/\)/", "", $name);
    $name = trim($name);
    $name= ucwords(strtolower($name));
    $address = array();
    foreach ($venue['venue']['location']['formattedAddress'] as $line){
        $line = filter_var($line,FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
        $line = preg_replace("/(?![;&#.=$'€%-])\p{P}[^a-zA-Z]/u", "", $line);
        array_push($address, $line);
    }
    if (($name != "") && (preg_match("/[a-zA-Z]/", $name))){
    $info = [
        "id" => $venue['venue']['id'],
        "name" => $name,
        "lat" => $venue['venue']['location']['lat'],
        "lng" => $venue['venue']['location']['lng'],
        "address" => $address,
        "category" => $venue['venue']['categories'][0]['name'],
        "icon" => $venue['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
    ];
    array_push($foursquareVenues, $info);	
};
};
$parksVenues = array();
foreach ($parks as $park){
    $name = filter_var($park['venue']['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = preg_replace("/(?![;&#.=$'€%-])\p{P}[^a-zA-Z]/u", "", $name);
    $name = preg_replace("/\|/", "", $name); 
    $name = preg_replace("/\(/", "", $name);
    $name = preg_replace("/\)/", "", $name);
    $name = trim($name);
    $name= ucwords(strtolower($name));
    $address = array();
    foreach ($park['venue']['location']['formattedAddress'] as $line){
        $line = filter_var($line,FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
        $line = preg_replace("/(?![;&#.=$'€%-])\p{P}[^a-zA-Z]/u", "", $line);
        array_push($address, $line);
    }
    if (($name != "") && (preg_match("/[a-zA-Z]/", $name))){
    $info = [
        "id" => $park['venue']['id'],
        "name" => $name,
        "lat" => $park['venue']['location']['lat'],
        "lng" => $park['venue']['location']['lng'],
        "address" => $address,
        "category" => $park['venue']['categories'][0]['name'],
        "icon" => $park['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
    ];
    array_push($parksVenues, $info);	
};
};
$foodVenues = array();
foreach ($food as $venue){
    $name = filter_var($venue['venue']['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = preg_replace("/(?![;&#.=$'€%-])\p{P}[^a-zA-Z]/u", "", $name);
    $name = preg_replace("/\|/", "", $name); 
    $name = preg_replace("/\(/", "", $name);
    $name = preg_replace("/\)/", "", $name);
    $name = trim($name);
    $name= ucwords(strtolower($name));

    $address = array();
    foreach ($venue['venue']['location']['formattedAddress'] as $line){
        $line = filter_var($line,FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
        $line = preg_replace("/(?![;&#.=$'€%-])\p{P}[^a-zA-Z]/u", "", $line);
        array_push($address, $line);
    }
    if (($name != "") && (preg_match("/[a-zA-Z]/", $name))){
    $info = [
        "id" => $venue['venue']['id'],
        "name" => $name,
        "lat" => $venue['venue']['location']['lat'],
        "lng" => $venue['venue']['location']['lng'],
        "address" => $address,
        "category" => $venue['venue']['categories'][0]['name'],
        "icon" => $venue['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
    ];
    array_push($foodVenues, $info);	
};
};
$barsVenues = array();
foreach ($bars as $venue){
    $name = preg_replace("/\&#39/", "'", $name);
    $name = filter_var($venue['venue']['name'],FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
    $name = preg_replace("/(?!['])\p{P}[^a-zA-Z]/u", "", $name);
    $name = preg_replace("/\|/", "", $name); 
    $name = preg_replace("/\(/", "", $name);
    $name = preg_replace("/\)/", "", $name);
    $name = trim($name);
    $name= ucwords(strtolower($name));
   
    $address = array();
    foreach ($venue['venue']['location']['formattedAddress'] as $line){
        $line = filter_var($line,FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
        $line = preg_replace("/(?![;&#.=$'€%-])\p{P}[^a-zA-Z]/u", "", $line);
        array_push($address, $line);
    }
    if (($name != "") && (preg_match("/[a-zA-Z]/", $name))){
    $info = [
        "id" => $venue['venue']['id'],
        "name" => $name,
        "lat" => $venue['venue']['location']['lat'],
        "lng" => $venue['venue']['location']['lng'],
        "address" => $address,
        "category" => $venue['venue']['categories'][0]['name'],
        "icon" => $venue['venue']['categories'][0]['icon']['prefix'] . "bg_32" . $venue['venue']['categories'][0]['icon']['suffix'],
    ];
    array_push($barsVenues, $info);	
};
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
    "dailyCovid" => [
        'deaths' => $dailyDeaths,
        'cases' => $dailyCases,
        'date' => $dates,
    ],
    "allInfo" => [
        "geonames" => $all,
        "rest" => $restcountry,
    ], 
    "slug" => $slug,
    "code" => $code,
    "earthquakes" => $eq,
    "wikipedia" => [
                    "capital" => $capitalWiki,
                    "country" => $wikiCountry,
    ],
    "monthly" => $monthlyWeather,
    "news" => $news,
    "exchange" => [
        "pound" => $pound,
        "euro" => $euro,
        "dollar" => $dollar,
    ]
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