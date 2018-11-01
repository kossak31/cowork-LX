
//converter timestamp para humano
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dez'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    //var hour = a.getHours();
    //var min = a.getMinutes();
    //var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; //+ ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function seguir_rua_google_maps(rua) {
    return "<a target='_blank' title='seguir para o google maps' href='https://www.google.com/maps/place/" + rua + "'>" + rua + "</a>";
}

function seguir_site_cowork(site) {
    return "<a target='_blank' title='seguir para o site' href='" + site + "'>" + site + "</a>";
}

function ler_iva(perceber, semIVA, IVA) {

    var IVA = 0.23;
    var preco = semIVA;

    switch (perceber) {
        case false:
            console.log("oh ninguem colocou o IVA...vou calcular...");
            console.log("preço sem iva: " + semIVA);
            sum = IVA * preco;
            console.log("valor extra do iva: " + sum.toFixed(2));
            sum += preco;
            console.log("preço final com iva:" + sum.toFixed(2));
            return  "<b>custos calculados:</b><br>" +
                    "CALCULO sem IVA: " + semIVA + "€<br>"
                    + "CALCULO com IVA: " + sum + '€';
            break;

        case null:
            return  "associação sem fins lucrativos";
            break;

            //registo compleco com valores
        default:
            sum = IVA * preco;
            sum += preco;
            console.log("existe valores de preco e IVA");
            return  "<b>Custos:</b><br>" +
                    "sem IVA " + semIVA + "€<br>"
                    + "IVA" + sum + '€';
            break;
    }

}

function verificar_status_marcador(status) {
    if (status != true) {
        return 'images/marcador/marcadorRED.png'; //imagem para info falsa
    } else {
        return 'images/marcador/marcador.png';
    }
}

function tipo_horario(valor) {

    switch (valor) {
        case "FECHADO":
            return '<span class="error"> FECHADO </span>';
            break;
        case "fullTime20":
            return '8h-20h';
            break;
        case "fullTime22":
            return '8h-22h';
            break;
        case "fullTime23":
            return '8h-23h';
            break;
        case "fullDay":
            return 'Aberto 24 horas';
            break;
        case "dayWork":
            return '9h-18h';
            break;
        case "meninos":
            return '9h-17h';
            break;
        case "dayWork19":
            return '9h-19h';
            break;
    }


}

function em_falta(opcoes) {
    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "campo em FALSE" +
                    "</div>";
            return x;
            break;
        default:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "campo em FALTA" +
                    "</div>";
            return x;
            break;
    }
}


function ler_telefone(opcoes) {
    switch (opcoes) {

        case false:
            return '<del>este campo está em falta</del>';
            break;

        default:
            return '<a href="tel:+' + opcoes + '">' + opcoes + '</a>';
            break;
    }
}


function servico_correio(opcoes) {
    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "Correio" +
                    "</div>";
            return x;
            break;
        
        default:
            var x = "<div class='chip'>" +
                    "<img src='https://png.icons8.com/wired/50/000000/mailbox-closed-flag-up.png'>" +
                    "Serviço de Correio" +
                    "</div>";
            return x;
            break;
    }
}


function virtual_address(opcoes) {
    switch (opcoes) {

        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "Correio" +
                    "</div>";
            return x;
            break;

        default:
            var x = "<div class='chip'>" +
                    "<img src='https://png.icons8.com/wired/50/000000/radar.png'>" +
                    "Morada Virtual" +
                    "</div>";
            return x;
            break;
    }
}


function mobile_kitchen(opcoes) {

    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "hotdesk" +
                    "</div>";
            return x;
            break;
            
        default:
            var x = "<div class='chip'>" +
                    "<img  title='existe refeitorio' src='images/legenda/kitchen.png' >" +
                    "cozinha" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_email(opcoes) {

    switch (opcoes) {
        case false:
            return '<span class="error">campo em falta</span>';
            break;
            
        default:
            return '<a href="mailto:' + opcoes + '">' + opcoes + '</a>';
            break;
    }
}

function mobile_hot_desk(opcoes) {

    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "hotdesk" +
                    "</div>";
            return x;
            break;
            
        case true:
            var x = "<div class='chip'>" +
                    "<img  title='existe mesa tipo hot desk' src='images/legenda/hot_desk.png' >" +
                    "hotdesk" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_mesa_dedicada(opcoes) {

    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "Mesa dedicada" +
                    "</div>";
            return x;
            break;
            
        case true:
            var x = "<div class='chip'>" +
                    "<img  title='existe mesa tipo singular' src='images/legenda/desk.png' >" +
                    "Mesa dedicada" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_salas(opcoes) {

    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "salas" +
                    "</div>";
            return x;
            break;
            
        case true:
            var x = "<div class='chip'>" +
                    "<img title='existe cacifos' src='images/legenda/salas.png' >" +
                    "salas" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_cacifo(opcoes) {
    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "cacifo" +
                    "</div>";
            return x;
            break;
            
        case true:
            var x = "<div class='chip'>" +
                    "<img title='existe cacifos' src='images/legenda/locker.png' >" +
                    "cacifo" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_pets(opcoes) {
    switch (opcoes) {

        case false:
            break;

        case true:
            var x = "<div class='chip'>" +
                    "<img title='permite animais' src='images/legenda/pets.png' >" +
                    "animais" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_impressoraA3(opcoes) {

    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "Impressora A3" +
                    "</div>";
            return x;
            break;
            
        case true:
            var x = "<div class='chip'>" +
                    "<img title='existe impressora para A3' src='images/legenda/A3.png'>" +
                    "Impressora A3" +
                    "</div>";
            return x;
            break;
    }
}

function mobile_impressoraA4(opcoes) {

    switch (opcoes) {
        case false:
            var x = "<div class='chip'>" +
                    "<img src='images/legenda/stop.png' >" +
                    "Impressora A4" +
                    "</div>";
            return x;
            break;
            
        case true:
            var x = "<div class='chip'>" +
                    "<img title='existe impressora para A3' src='images/legenda/A4.png'>" +
                    "Impressora A4" +
                    "</div>";
            return x;
            break;
    }
}

