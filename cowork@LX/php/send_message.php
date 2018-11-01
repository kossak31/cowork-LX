<?php

//formulario de contacto
if (isset($_POST['tentativa_contacto'])) {

    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];

//    echo $_POST['email'] . " " . $_POST['mensagem'];
    inserir_novo_contacto($email, $mensagem);
} else {
    echo "ERROR POST";
}

//descobre a ultima key
function inserir_novo_contacto($email, $mensagem) {

    $contents = file_get_contents('../json/mensagens.json');
    $contentsDecoded = json_decode($contents, true);

    $keys = array_keys($contentsDecoded);
    $last_key = array_pop($keys);
    $last_key++;
    $next_key = $last_key;
    echo $last_key;


//Modify the counter variable.
    $contentsDecoded[$last_key] = array(
        'email' => $email,
        'mensagem' => $mensagem
    );

//Encode the array back into a JSON string.
    $json = json_encode($contentsDecoded, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

//Save the file.
    file_put_contents('../json/mensagens.json', $json);
}
