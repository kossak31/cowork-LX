<?php

if (!isset($_POST['selector'])) {
    echo "nao existe post";
} else {

    $spot_work = $_POST['selector'];

    //Get data json file
    $contents = file_get_contents('../json/coworkLX.json');
    $contentsDecoded = json_decode($contents, true);

//print_r($contentsDecoded['coworksLX']['0']['views']);
//adicionar +1
    $contentsDecoded['coworksLX'][$spot_work]['views']++;


//Encode array JSON
    $json = json_encode($contentsDecoded, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);


    file_put_contents('../json/coworkLX.json', $json);
    echo "PHP: view registada em: " . $spot_work;
}
