
const lisboa = {
    lat: 38.7222524,
    lng: -9.139336599999979
}


//legenda do mapa incial
var legendas_mapa = {
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



function initMap() {


    options = {
        backgroundColor: 'black',
        keyboardShortcuts: true,
        gestureHandling: 'greedy',
        center: lisboa,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_BOTTOM,

        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'hybrid'],
        },
        styles: legendas_mapa['hide'] //iniciar legendas, sem legenda transit e poi
    };
    map = new google.maps.Map(document.getElementById('map'), options);
    // Creating a LatLngBounds object 
    var bounds = new google.maps.LatLngBounds();


    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
    // DIV zoomControl()
    // constructor passing in this DIV.
    var zoomDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomDiv, map);
    zoomDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(zoomDiv);


    // objecto global infoWindow usado nos markers
    infoWindow = new google.maps.InfoWindow({
        maxWidth: 200,
        maxHeight: 200
    });
    google.maps.event.addListener(map, 'click', closeInfoWindow);
    //layer com TransitLayer
    transitLayer = new google.maps.TransitLayer();
    //    google.maps.event.addDomListener(document.getElementById('logo_metro'), 'click', toggleTrasit);

    //
    google.maps.event.addListener(map, 'maptypeid_changed', function (e) {
        alert(map.getMapTypeId());
    });

    console.log("a receber JSON data ...");
    $.getJSON("json/coworkLX.json", function (result) {
        $.each(result, function (index, field) {
            console.log('... a processar, total registos: ' + field.length);
            for (var i = 0, length = field.length; i < length; i++) {
                data = field[i], latLng = new google.maps.LatLng(data.lat, data.lng);
                //criar marker, colocar no mapa, imagem, label
                var marker = new google.maps.Marker({
                    icon: {
                        url: verificar_status_marcador(data.verificado),
                        labelOrigin: new google.maps.Point(0, -8)
                    },
//                    label: {
//                        text: data.cowork,
//                        color: 'black',
//                        fontSize: '18px',
//                        fontWeight: 'bold',
//                    },
                    position: latLng,
                    map: map,
                    title: data.cowork
                });

                (function (marker, data) {  // JavaScript closure, function anonima com variaveis private

                    map.addListener('zoom_changed', function () { //activar texto label marker
                        console.log('Zoom: ' + map.getZoom());


                        if (map.getZoom() <= 14) { //maior no zoomIn
                            marker.setLabel();
                        } else {
                            marker.setLabel({
                                fontFamily: 'Arial Black',
                                text: data.cowork,
                                color: 'red',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            });

                        }

                    });

                    google.maps.event.addListener(marker, "click", function () {
                        $('#banner').hide();


                        tabela_info = $([
                            "<div class='wrapper animated bounceInUp'>",
                            " <header class='header'>... acerca deste cowork</header>",
                            "  <div class='card'>",
                            "  <h1>" + data.cowork + "</h1>",
                            "  <p>website: " + seguir_site_cowork(data.website) + "</p>",
                            "  <p>contacto: " + mobile_email(data.email) + "</p>",
                            "<span id='preco'>" + ler_iva(data.preco[0].IVA, data.preco[0].semIVA, data.preco[0].IVA) + "</span>",
                            //"<br>sem IVA" + em_falta(data.preco[0].semIVA),

                            "<h2>morada:</h2>" + seguir_rua_google_maps(data.morada),
                            "<h2>Oferta de Condições:</h2>",
                            "<div style='border:1px solid;'>",
                            mobile_mesa_dedicada(data.condicoes[0].mesa_dedicada),
                            mobile_hot_desk(data.condicoes[0].hot_desk),
                            mobile_salas(data.condicoes[0].salas),
                            mobile_impressoraA3(data.condicoes[0].impressoes[0].A3),
                            mobile_impressoraA4(data.condicoes[0].impressoes[0].A4),
                            servico_correio(data.condicoes[0].mail_service),
                            mobile_cacifo(data.condicoes[0].lockers),
                            mobile_kitchen(data.condicoes[0].kitchen),
                            mobile_pets(data.condicoes[0].pets),

                            "</div>",
                            "<table id='horario_mobile'>",
                            '<caption><h2>conhece o horário</h2></caption>',
                            '<tr>',
                            '<th>SEG</th>',
                            '<th>' + tipo_horario(data.horario[0].seg) + '</th>',
                            '</tr>',
                            '<th>TER</th>',
                            '<th>' + tipo_horario(data.horario[0].ter) + '</th>',
                            '</tr>',
                            '<th>QUA</th>',
                            '<th>' + tipo_horario(data.horario[0].qua) + '</th>',
                            '</tr>',
                            '<th>QUI</th>',
                            '<th>' + tipo_horario(data.horario[0].qui) + '</th>',
                            '</tr>',
                            '<th>SEX</th>',
                            '<th>' + tipo_horario(data.horario[0].sex) + '</th>',
                            '</tr>',
                            '<th>SAB</th>',
                            '<th>' + tipo_horario(data.horario[0].sab) + '</th>',
                            '</tr>',
                            '<th>DOM</th>',
                            '<th>' + tipo_horario(data.horario[0].dom) + '</th>',
                            '</tr>',
                            '</table>',
                            "<br><small>última vez actualizado em: <span style='text-decoration: underline;'>" + timeConverter(data.actualizado) + "</span></small>",
                            "</div>",
                            "<footer class='footer'><h3 id='ver_mapa' class='slow-anime animated infinite zoomIn'>« Ver MAPA</h3></footer>",
                            "</div>"
                        ].join("\n"));


                        $("#display_item").html(tabela_info);
                        console.log('* A VER ITEM EM MOBILE *');
                        $('#banner').hide();
                        $('#map').hide();

                        $('#display_item').show();

                        $("#ver_mapa").on('click', function () {
                            $('#map').show();
                            $('#display_item').hide();
                            $('#banner').show();
                            console.log('desligar vista voltar a ver mapa');
                        });

                        infoWindow.setContent(
                                data.cowork + "<br>"
                                + data.views + " clicks<br>"
                                + "website:<br>" + seguir_site_cowork(data.website) + "<hr>"
                                + "Morada:<br>" + seguir_rua_google_maps(data.morada) + "<br>"
                                + "<br>actualizado em: " + timeConverter(data.actualizado)
                                );
                        infoWindow.open(map, marker);
                    });


                })(marker, data);

                // Extending the bounds object with each LatLng 
                bounds.extend(field[i]);

            }


            // Adjusting the map to new bounding box 
            map.fitBounds(bounds);

        });

    });



}//EOF initMap()


