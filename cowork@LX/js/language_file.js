var arrMenu = {
    "pt": {
        "info": "informação",
        "horario": "horario",
        "infraestrutura": "infra-estrutura",
        "condicoes": "condições oferecidas"
    },
    "en": {
        "info": "information",
        "horario": "schedule",
        "infraestrutura": "infra-estrutura",
        "condicoes": "conditions"
    },
    "fr": {
        "info": "information",
        "horario": "calendrier",
        "infraestrutura": "infra-estrutura",
        "condicoes": "conditions"
    }
};



var arrLang = {
    "pt": {
        "info": "inicio",
        "adicionar": "adicionar",
        "faq_titulo": "faq",
        "opções": "opções",
        "seleciona_idioma": "alterar idioma",
        "contacto": "contacto",
        "gps": "onde estou?",
        "contacto_titulo": "Formulário de Contacto",
        "contacto_email": "endereço de email:",
        "contacto_antispam": "Nós nunca vamos compartilhar seu e-mail com mais ninguém.",
        "contacto_mensagem": "Escreve aqui a mensagem:",
        "contacto_enviar": "enviar mensagem",
        "condicoes_preco": "custo:",
        "condicoes_horario": "horario:",
        "condicoes_contracto": "contrato minimo",
        "condicoes_gerais": "condições"

    },
    "en": {
        "info": "start",
        "adicionar": "add",
        "faq_titulo": "common questions",
        "opções": "options",
        "seleciona_idioma": "Change the language",
        "contacto": "contact",
        "gps": "where i am?",
        "contacto_titulo": "Contact form",
        "contacto_email": "email address:",
        "contacto_antispam": "We'll never share your email with anyone else.",
        "contacto_mensagem": "Type the message here",
        "contacto_enviar": "send Message",
        "condicoes_preco": "en custo:",
        "condicoes_horario": "en horario:",
        "condicoes_contracto": "en contracto minimo",
        "condicoes_gerais": "en condições"
    },
    "fr": {
        "info": "commencer",
        "adicionar": "ajouter",
        "faq_titulo": "questions fréquemment posées",
        "opções": "options",
        "seleciona_idioma": "changer la langue",
        "contacto": "contacter",
        "gps": "où suis-je?",
        "contacto_titulo": "Formulaire de contact",
        "contacto_email": "Votre adresse email:",
        "contacto_antispam": "Nous ne partagerons jamais votre email avec quelqu'un d'autre.",
        "contacto_mensagem": "Tapez le message ici:",
        "contacto_enviar": "envoyer un message",
        "condicoes_preco": "fr custo:",
        "condicoes_horario": "fr horario:",
        "condicoes_contracto": "fr contracto minimo",
        "condicoes_gerais": "fr condições"
    }
};





function find_language() {
    console.log("language default: " + navigator.language);
    return navigator.language;
}



var idioma = find_language();
var url = document.location.href;



if (typeof (Storage) !== "undefined") {
    localStorage.setItem("idioma", idioma);
    console.log(localStorage.getItem("idioma"));
} else {
    alert('your browser does not support Web Storage...');
}


switch (idioma) {


    case 'en':
        url += "#" + localStorage.getItem("idioma");
        if (location.hash == '') {
            location.replace(url);
        }

        console.log('idioma en');
        $('.translate').click();
        break;


    case 'pt':
        url += "#" + localStorage.getItem("idioma");
        if (location.hash == '') {
            location.replace(url);
        }
        
        $("#home").load("pages/introPT.html");

        console.log('idioma pt' + location.hash);
        $('.translate').click();
        break;


    case 'fr':
        url += "#" + localStorage.getItem("idioma");
        if (location.hash == '') {
            location.replace(url);
        }

        console.log('idioma fr');
        $('.translate').click();
        break;


    default:
        url += "#" + localStorage.getItem("idioma");
        if (location.hash == '') {
            location.replace(url);
        }

        console.log('sem lingua vou colocar em ingles');
        $('.translate').click();
        break;
}







$('.translate').click(function () {

    $('#geolocation').addClass('lang');
    $('#geolocation').attr('key', 'gps');

    $('#pills-acessos-tab').addClass('langMenu');
    $('#pills-acessos-tab').attr('key', 'infraestrutura');

    idioma = $(this).attr('id');

    $('.lang').each(function (index, element) {
        $(this).text(arrLang[idioma][$(this).attr('key')]);
    });

    $('.langMenu').each(function (index, element) {
        $(this).text(arrMenu[idioma][$(this).attr('key')]);
    });
});



