<!doctype html>
<html lang="pt">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


        <link rel="stylesheet" href="../css/bootstrap.min.css" >
        <link rel="stylesheet" href="../css/animate.css" >

        <title class="lang" key="titulo" >formulario de contacto</title>

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

        <div class=" container ">

            <div class="row">
                <div class="col-12 pb-5 ">

                    <h1 class="pt-2 text-center text-uppercase lang" key="titulo"  >formulario de contacto</h1>

                    <div class="py-2 text-center">
                        <img class="translate" id="en" src="../images/flag/en.png" >
                        <img class="translate" id="pt" src="../images/flag/pt.png" >
                        <img class="translate" id="fr" src="../images/flag/fr.png" >
                    </div>


                    <form method="POST" action="https://cowork.barata.pt/process.php">

                        <div class="form-group">
                            <label class="lang" key="email" for="exampleInputEmail1">campo email</label>
                            <input autofocus name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required>
                            <small id="emailHelp" key="antispam" class="lang form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div class="form-group">
                            <label class="lang" key="mensagem" for="exampleInputPassword1">campo mensagem</label>
                            <textarea name="mensagem" style="resize:none;" class="lang form-control" id="exampleInputPassword1" required></textarea>
                        </div>

                        <button name="tentativa_contacto" key="enviar" type="submit" class="lang float-right btn btn-outline-success">enviar mensagem</button>

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
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>


        <script>
            var lang = navigator.language;
            switch (lang) {
                case 'pt':
                    console.log('lingua: ' + lang);
                    break;
                case 'en':
                    console.log('lingua: ' + lang);
                    break;
                default:
                    var lang = 'en';
                    console.log('força en' + lang);
                    break;
            }

            var arrLang = {
                "pt": {
                    "titulo": "Formulário de Contacto",
                    "email": "endereço de email:",
                    "antispam": "Nós nunca vamos compartilhar seu e-mail com mais ninguém.",
                    "mensagem": "Escreve aqui a mensagem:",
                    "enviar": "enviar mensagem"

                },
                "en": {
                    "titulo": "Contact form",
                    "email": "email address:",
                    "antispam": "We'll never share your email with anyone else.",
                    "mensagem": "Type the message here",
                    "enviar": "send Message"

                },
                "fr": {
                    "titulo": "Formulaire de contact",
                    "email": "Votre adresse email:",
                    "antispam": "Nous ne partagerons jamais votre email avec quelqu'un d'autre.",
                    "mensagem": "Tapez le message ici:",
                    "enviar": "envoyer un message"

                }
            };

            $('.lang').each(function (index, element) {
                $(this).text(arrLang[lang][$(this).attr('key')]);
            });


            $('.translate').click(function () {
                var lang = $(this).attr('id');
                $('.lang').each(function (index, element) {
                    $(this).text(arrLang[lang][$(this).attr('key')]);
                });
            });

            $('#ver_mapa').click(function () {
                window.location.href = "https://cowork.barata.pt";

            });



        </script>


    </body>
</html>