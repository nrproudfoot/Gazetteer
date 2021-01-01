<?php

	$str = file_get_contents('countryBorders.json');
	$decode = json_decode($str,true);
	$countries =$decode['features'];
	echo json_encode($countries); 
?>