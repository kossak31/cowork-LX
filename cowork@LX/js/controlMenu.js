
//permite fechar a infoWindow a clicar no mapa
function closeInfoWindow() {
    infoWindow.close();
}


function ZoomControl(controlDiv, map) {
// Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'zoom out';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.id = 'centrar_mapa';
    controlText.style.display = 'none';
    controlText.style.color = 'black';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Centrar Mapa';
    controlUI.appendChild(controlText);
    controlUI.addEventListener('click', function () {
        map.setCenter(lisboa);
        map.setZoom(12);
    });
}



function CenterControl(controlDiv, map) {

// Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'activar geolocation HTML5';

    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.id = 'geolocation';
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Onde Estou?';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function () {

        //HTML5 geolocation   
        navigator.geolocation.getCurrentPosition(function (position) {

            position.enableHighAccuracy = true;
            position.maximumAge = 0;
            position.timeout = 10000;

            var ondeEstou = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //esconder botao geoposicao

            if (ondeEstou === null) {
                console.log('sem valor');
                document.getElementById("centrar_mapa").style.display = "none";
            } else {
                document.getElementById("centrar_mapa").style.display = "block";
                document.getElementById("geolocation").style.display = "none";
            }

            janela_voce_esta_aqui = new google.maps.InfoWindow({
                content: 'VOÇÊ ESTÁ AQUI!',
                maxWidth: 200,
                maxHeight: 200

            });
            marcador_voce_esta_aqui = new google.maps.Marker({
                position: ondeEstou,
                map: map,
                title: 'VOÇÊ ESTÁ AQUI!',
                icon: 'images/marcador/where.png'
            });


            marcador_voce_esta_aqui.addListener('click', function () {
                janela_voce_esta_aqui.open(map, marcador_voce_esta_aqui);
                andamento = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: ondeEstou,
                    radius: 5 * 1000 //5km
                });


            });
            marcador_voce_esta_aqui.setAnimation(google.maps.Animation.BOUNCE);
            janela_voce_esta_aqui.open(map, marcador_voce_esta_aqui);
            map.setCenter(ondeEstou);
            map.setZoom(14);
        });
    });
}