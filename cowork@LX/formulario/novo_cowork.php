<!doctype html>
<html lang="pt">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/animate.css" >
        <link rel="stylesheet" href="../css/desktop.css" >


        <title>adicionar novo cowork</title>


        <style>

            .footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px; /* Set the fixed height of the footer here */
                padding-top: 10px;
                background-color: yellowgreen;
                color: white;
                text-transform: uppercase;
                text-align: center;
                font-size: 28px;
                cursor: pointer;
            }

            .translate {
                padding: 20px;
                cursor: pointer;

            }
        </style>

    </head>


    <body>

        <div class="pb-5 container">
            <div class="row">
                <div class="col-12">




                    <h1 class="">
                        sabes de outro cowork e não esta listado?
                        <small>adiciona por aqui!</small>
                    </h1>


                    <div class="py-2 text-center">
                        <img class="translate" id="en" src="../images/flag/en.png" >
                        <img class="translate" id="pt" src="../images/flag/pt.png" >
                        <img class="translate" id="fr" src="../images/flag/fr.png" >
                    </div>



                    <form method="GET" action="/formulario/novo_cowork.php">
                        <div class="form-group">
                            <label for="cowork">nome do cowork</label>
                            <input autofocus name="nome" type="text" class="form-control" id="cowork" placeholder="cowork">

                        </div>


                        <div class="form-group">
                            <label for="website">website</label>
                            <input name="website" type="text" class="form-control" id="website" placeholder="http://www">
                        </div>

                        <div class="form-group">
                            <label for="morada">Onde fica</label>
                            <input name="morada" type="text" class="form-control" id="morada" placeholder="indicar a morada">
                        </div>

                        <div class="form-group">


                            <label for="valor">Quanto Custa</label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon3">€</span>
                                </div>
                                <input type="text" class="form-control" id="valor" aria-describedby="basic-addon3">
                            </div>

                        </div>


                        <h3>Impressora</h3>
                        <label for="">A4</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" aria-label="Checkbox for following text input">
                                </div>
                            </div>
                            <input type="text" class="form-control" aria-label="Text input with checkbox">
                            <input type="text" class="form-control">
                        </div>

                        <label for="">A3</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" aria-label="Checkbox for following text input">
                                </div>
                            </div>
                            <input type="text" class="form-control" aria-label="Text input with checkbox">
                        </div>




                        <div class="form-group">
                            <label for="">Horario</label>

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                <label class="form-check-label" for="inlineRadio1">Aberto 24h</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                <label class="form-check-label" for="inlineRadio2">8h às 22h</label>
                            </div>


                        </div>





                        <div class="form-group">
                            <label for="comment">info adicional:</label>
                            <textarea class="form-control" rows="5" id="comment" placeholder="a rede wireless é de 200megas, o parque de estacionamento é a pagar"></textarea>
                        </div> 




                        <div class="float-right btn-group" role="group" aria-label="Basic example">
                            <a href="http://php.barata.pt/templates/like/cowork/" class="btn btn-danger">« Voltar para o mapa</a>
                            <button type="submit" class="btn btn-primary">Enviar Pedido</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <h3 id='ver_mapa' class='slow-anime animated infinite zoomIn'>« Ver MAPA</h3>
            </div>
        </footer>


        <script src="../js/jquery-3.3.1.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>


        <script>
            $('#ver_mapa').click(function () {
                window.location.href = "https://cowork.barata.pt";

            });


        </script>


    </body>
</html>

<?php print_r($_GET); ?>