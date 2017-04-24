<?php
header( 'Content-Type: application/json' );
ini_set("allow_url_fopen", 1);


$iles = array('Moutsamoudou','Mamoudzou','Moheli','Moroni');

foreach($iles as $ile) {
    $json = file_get_contents('http://api.wunderground.com/api/5fe80449e735d30f/conditions/q/COMOROS/'.$ile.'.json');
    
    switch ($ile) {
    case "Moutsamoudou":
       $fp = fopen('Anjouan.json', 'w');
        break;
    case "Mamoudzou":
        $fp = fopen('Mayotte.json', 'w');
        break;
    default:
       $fp = fopen($ile.'.json', 'w');
        break;
    }
    
    $obj = json_decode($json);
    fwrite($fp, json_encode($obj));
    fclose($fp);
}





?>