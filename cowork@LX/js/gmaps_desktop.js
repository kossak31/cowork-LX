(function () {


    //legenda do mapa incial
    const legendas_mapa = {
        default: null,
        hide: [{
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            }],
        show: [{
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{visibility: 'on'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            }]
    };
    const lisboa = [38.72666729999999, -9.166481500000032];


    var map = new google.maps.Map(document.getElementById("map"), {
        backgroundColor: 'black',
        center: new google.maps.LatLng(lisboa[0], lisboa[1]),
        minZoom: 12,
        maxZoom: 17,
        zoomControl: true,
        scaleControl: true,
        fullscreenControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'hybrid'],
        },
        styles: legendas_mapa['hide'], //iniciar legendas, sem legenda transit e poi


    });

    // Creating a LatLngBounds object 
    var bounds = new google.maps.LatLngBounds();

    transitLayer = new google.maps.TransitLayer(); //camada metro
    google.maps.event.addDomListener(document.getElementById('logo_metro'), 'click', toggleTrasit);

    google.maps.event.addDomListener(document.getElementById('whereiam'), 'click', toggleGPS);

//activar camada
    function toggleTrasit() {
        if (transitLayer.getMap() == null) {
            this.src = "images/legenda/metro_on.png";
            transitLayer.setMap(map); //traffic layer is disabled.. enable it
        } else {
            this.src = "images/legenda/metro_off.png";
            transitLayer.setMap(null); //traffic layer is enabled.. disable it
        }
    }

    function toggleGPS() {


        navigator.geolocation.getCurrentPosition(function (position) {

            position.enableHighAccuracy = true;
            position.maximumAge = 600000;
            position.timeout = 60000;


            var ondeEstou = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };


            janela_voce_esta_aqui = new google.maps.InfoWindow({
                content: 'VOÇÊ ESTÁ AQUI!',
                maxWidth: 200,
                maxHeight: 200

            });


            marcador_voce_esta_aqui = new google.maps.Marker({
                position: ondeEstou,
                map: map,
                title: 'geolocation HTML5',
                icon: 'images/marcador/where.png'
            });


            marcador_voce_esta_aqui.addListener('click', function () {
                janela_voce_esta_aqui.open(map, marcador_voce_esta_aqui);
                andamento = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: 'blue',
                    fillOpacity: 0.35,
                    map: map,
                    center: ondeEstou,
                    radius: 5 * 1000 //5km
                });


            });
            marcador_voce_esta_aqui.setAnimation(google.maps.Animation.BOUNCE);
            janela_voce_esta_aqui.open(map, marcador_voce_esta_aqui);
            map.panTo(ondeEstou);


        });




    }




//activar legendas mapa
    document.getElementById('hide-poi').addEventListener('click', function () {
        map.setOptions({
            styles: legendas_mapa['hide']
        });
    });

    document.getElementById('show-poi').addEventListener('click', function () {
        map.setOptions({
            styles: legendas_mapa['default']
        });
    });



    // objecto global infoWindow usado nos markers
    infoWindow = new google.maps.InfoWindow({
        maxWidth: 500
    });


    google.maps.event.addListener(map, 'click', function () {
        infoWindow.close();//quando clicamos no mapa fechamos a infoWindow
        map.fitBounds(bounds); //zoomout para ver todos os marcadores
    });


    $.getJSON("json/coworkLX.json", function (result) {

        $.each(result, function (index, field) {
            for (var i = 0, length = field.length; i < length; i++) {

                console.log('total registos: ' + field.length);
                var data = field[i], latLng = new google.maps.LatLng(data.lat, data.lng);

                if (data.verificado != true) {
                    imagem_marcador = 'images/marcador/marcadorRED.png';
                } else {
                    imagem_marcador = 'images/marcador/marcador.png';
                }

                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({

                    position: latLng,
                    icon: {
                        url: imagem_marcador,
                        labelOrigin: new google.maps.Point(0, Math.floor(Math.random() * 5))
                    },

                    map: map,
                    title: data.cowork,
                    url: window.location.href + '#' + i
                });



                (function (marker, data) {

                    map.addListener('zoom_changed', function () { //activar texto label marker

                        console.log('Zoom: ' + map.getZoom());
                        if (map.getZoom() <= 13) { //maior no zoomIn
                            marker.setLabel();

                        } else {

                            marker.setLabel({
                                fontFamily: 'Arial Black',
                                text: data.cowork,
                                color: 'red',
                                fontSize: '15px',
                                fontWeight: 'bold',

                            });

                        }

                    });



                    //altera vermelho e verde para ver se info esta verificada
                    function verificar(check) {
                        switch (check) {
                            case false:
                                return '<span style="color:red;"><del>' + data.cowork + "</del></span>, a informação inserida NÃO está actualizada";
                                break;
                            case true:
                                return '<span style="color:green;">' + data.cowork + "</span>";
                                break;
                        }
                    }




                    google.maps.event.addListener(marker, "click", function () {
                        window.location.href = this.url;
                        link = window.location.href.toString();

                        regex = /\d/;
                        selector = regex.exec(link);
                        selector = selector.toString();


                        $.ajax({
                            cache: false,
                            url: "/php/segredo.php",
                            type: "POST",
                            data: {
                                selector: selector,
                            },
                            success: function () {
                                console.log('incremento na view');
                            },
                            error: function () {
                                console.log('ERROR a registar view');
                            }
                        });

                        map.setZoom(17);
                        map.setCenter(marker.getPosition());


                        function x(array) {

                            var text = '';
//
//                            for (x in array) {
//                                text += "preço: " + array[x].preco + "<br>";
//                                text += "A4 " + array[x].impressora_A4 + "<br>";
//                                text += "A3 " + array[x].impressora_A3 + "<br>";
//                                text += "contracto " + array[x].contracto + "<br>";
//
//                                for (impressora in array[x].impressora_A4) {
//                                    text += "tipo impressora " + array[x].impressora_A4[impressora] + "<br>";
//                                }
//                                text += '<hr>';
//                            }

                            for (key in array) {

                                if (array[key].preco) {
                                    text += "<span class='lang' key='condicoes_preco' >custo: </span>" + array[key].preco + " €<br>";
                                }

                                if (array[key].impressora_A4.pb) {
                                    text += "<span class='lang' key='condicoes_horario' >impressoes A4 a preto e branco: </span>" + array[key].impressora_A4.pb + "<br>";
                                }

                                if (array[key].impressora_A4.cores) {
                                    text += "<span class='lang' key='condicoes_horario' >impressoes A4 a cores: </span>" + array[key].impressora_A4.cores + "<br>";
                                }

                                if (array[key].impressora_A3.pb) {
                                    text += "<span class='lang' key='condicoes_horario' >impressoes A3 preto e branco: </span>" + array[key].impressora_A3.pb + "<br>";
                                }

                                if (array[key].impressora_A3.cores) {
                                    text += "<span class='lang' key='condicoes_horario' >impressoes A3 cores: </span>" + array[key].impressora_A3.cores + "<br>";
                                }

                                if (array[key].horario) {
                                    text += "<span class='lang' key='condicoes_horario' >horario: </span>" + array[key].horario + "<br>";
                                }

                                if (array[key].contracto) {
                                    text += "<span class='lang' key='condicoes_contracto' >contracto: </span>" + array[key].contracto + "<br>";
                                }

                                if (array[key].condições) {
                                    text += "<span class='lang' key='condicoes_gerais' >condições oferecidas: </span>" + array[key].condições + "<br>";
                                }
                                text += '<hr>';
                            }
                            return text;
                        }

                        tabela_info = $([
                            "<div id='myModal' class='modal fade ' tabindex='-1' role='dialog'>",
                            "<div class='modal-dialog modal-xs modal-dialog-centered' role='document'>",
                            "<div class='modal-content'>",
                            "<div class='modal-header'>",
                            "<h5 class=,'modal-title'>" + verificar(data.verificado) + "</h5>",
                            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>",
                            "<span aria-hidden='true'>&times;</span>",
                            "</button>",
                            "</div>",
                            "<div class='modal-body' style='font-size: 15px'>",
                            "<ul ' class='nav nav-pills mb-3' id='pills-tab' role='tablist' >",
                            "<li class='nav-item'>",
                            "<a class='nav-link active' id='pills-home-tab' data-toggle='pill' href='#pills-home' role='tab' aria-controls='pills-home' aria-selected='true'>Info</a>",
                            "</li>",
                            "<li class='nav-item'>",
                            "<a class='nav-link' id='pills-horario-tab' data-toggle='pill' href='#pills-horario' role='tab' aria-controls='pills-horario' aria-selected='false'>Horario</a>",
                            "</li>",
                            "<li class='nav-item'>",
                            "<a class='nav-link' id='pills-acessos-tab' data-toggle='pill' href='#pills-acessos' role='tab' aria-controls='pills-acessos' aria-selected='false' >infra-estrutura</a>",
                            "</li>",
                            "<li class='nav-item'>",
                            "<a class='nav-link' id='pills-condicoes-tab' data-toggle='pill' href='#pills-condicoes' role='tab' aria-controls='pills-condicoes' aria-selected='false'>Condições</a>",
                            "</li>",

                            "</ul>",
                            "<div class='tab-content' id='pills-tabContent'>",
                            "<div class='tab-pane fade show active' id='pills-home' role='tabpanel' aria-labelledby='pills-home-tab'>",
                            "<img src='https://png.icons8.com/dusk/50/000000/view-file.png'>" + data.views + "<br>",
                            "<img src='https://png.icons8.com/dusk/50/000000/link.png'>" + seguir_site_cowork(data.website) + "<br>",
                            "<img src='https://png.icons8.com/dusk/50/000000/email.png'>" + mobile_email(data.email) + "<br>",
                            "<img src='https://png.icons8.com/dusk/50/000000/phone.png'>" + ler_telefone(data.telefone) + "<br>",
                            "<img src='https://png.icons8.com/dusk/50/000000/google-maps.png'>" + seguir_rua_google_maps(data.morada) + "</p>",

                            "</div>",

                            "<div class='tab-pane fade' id='pills-horario' role='tabpanel' aria-labelledby='pills-horario-tab'>",
                            "<table><tr>",
                            '<th>SEG</th>',
                            '<th>' + tipo_horario(data.horario[0].seg) + '</th>',
                            '</tr>',
                            '<tr>',
                            '<th>TER</th>',
                            '<th>' + tipo_horario(data.horario[0].ter) + '</th>',
                            '</tr>',
                            '<tr>',
                            '<th>QUA</th>',
                            '<th>' + tipo_horario(data.horario[0].qua) + '</th>',
                            '</tr>',
                            '<tr>',
                            '<th>QUI</th>',
                            '<th>' + tipo_horario(data.horario[0].qui) + '</th>',
                            '</tr>',
                            '<tr>',
                            '<th>SEX</th>',
                            '<th>' + tipo_horario(data.horario[0].sex) + '</th>',
                            '</tr>',
                            '<tr>',
                            '<th>SAB</th>',
                            '<th>' + tipo_horario(data.horario[0].sab) + '</th>',
                            '</tr>',
                            '<tr>',
                            '<th>DOM</th>',
                            '<th>' + tipo_horario(data.horario[0].dom) + '</th>',
                            '</tr></table>',
                            "</div>",

                            "<div class='tab-pane fade' id='pills-acessos' role='tabpanel' aria-labelledby='pills-acessos-tab'>",
                            mobile_hot_desk(data.condicoes[0].hot_desk),
                            mobile_mesa_dedicada(data.condicoes[0].mesa_dedicada),
                            mobile_salas(data.condicoes[0].salas),
                            mobile_impressoraA3(data.condicoes[0].impressoes[0].A3),
                            mobile_impressoraA4(data.condicoes[0].impressoes[0].A4),
                            servico_correio(data.condicoes[0].mail_service),
                            virtual_address(data.condicoes[0].virtual_address),
                            mobile_kitchen(data.condicoes[0].kitchen),
                            mobile_cacifo(data.condicoes[0].lockers),
                            mobile_pets(data.condicoes[0].pets),

                            "</div>",

                            "<div class='tab-pane fade' id='pills-condicoes' role='tabpanel' aria-labelledby='pills-condicoes-tab'>",
                            x(data.limite[0]),
                            //console.log(data.limite[0]),

                            "</div>",

                            "</div>",

                            "</div>",
                            "<div class='modal-footer'>",
                            "<button type='button' class='btn btn-secondary btn-block' data-dismiss='modal'>Fechar</button>",
                            "</div>",
                            "</div>",
                            "</div>",
                            "</div>",
                            "</div>"
                        ].join("\n"));


                        $("body").after(tabela_info);

                        console.log('* A VER ITEM EM MOBILE *');


                        $('#myModal').modal('show');
                        sidebar.close();

                        console.log('click marker - fechar sidebar e ganhar posicao');

                        infoWindow.setContent(
                                "<div class='row' >"
                                + "<div><h5>" + verificar(data.verificado) + "</h5></div>"
                                + "<div>este registo foi visto: " + data.views + " vezes</div>"
                                + "</div>"
                                + ler_iva(data.preco[0].IVA, data.preco[0].semIVA, data.preco[0].IVA)
                                + "<br>Morada: " + seguir_rua_google_maps(data.morada) + "<br>"
                                + "<h5>Condições Oferecidas: </h5>"
                                + "<div class='row' >"
                                + "<div>"
                                + mobile_hot_desk(data.condicoes[0].hot_desk)
                                + "</div>"
                                + "<div>"
                                + mobile_mesa_dedicada(data.condicoes[0].mesa_dedicada)
                                + "</div>"
                                + "<div>"
                                + mobile_salas(data.condicoes[0].salas)
                                + "</div>"
                                + "<div>"
                                + mobile_impressoraA3(data.condicoes[0].impressoes[0].A3)
                                + "</div>"
                                + "<div>"
                                + mobile_impressoraA4(data.condicoes[0].impressoes[0].A4)
                                + "</div>"
                                + "<div>"
                                + data.condicoes[0].mail_service
                                + "</div>"
                                + "<div>"
                                + data.condicoes[0].virtual_address
                                + "</div>"
                                + "<div>"
                                + mobile_kitchen(data.condicoes[0].kitchen)
                                + "</div>"
                                + "<div>"
                                + mobile_cacifo(data.condicoes[0].lockers)
                                + "</div>"
                                + "<div>"
                                + mobile_pets(data.condicoes[0].pets)
                                + "</div>"
                                + "</div>"

                                );
                        infoWindow.open(map, marker);
                    });
                })(marker, data);

                // Extending the bounds object with each LatLng 
                bounds.extend(field[i]);


            } //eof FOR LOOP
            // Adjusting the map to new bounding box 
            map.fitBounds(bounds);


        }); //EOF each
    }); //EOF getJSON


}
)();
