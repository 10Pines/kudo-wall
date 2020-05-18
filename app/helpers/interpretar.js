var emoticonJson = require('../public/emoticons/emoji.json')

module.exports =  function(body){
    var mensaje = body.match(/a (.*?) por (.*)/i);
    if(mensaje === null || mensaje.length != 3){
        throw new Error('El formato del Kudo debe ser: `/kudo para [alguien] por [algo]`.');
    }

    return {
        para: mensaje[1],
        por: traducirEmoticones(emoticonesEnMensaje(mensaje[2]), mensaje[2])
    };
};

function emoticonesEnMensaje(message){
    var emoticones = [];
    for (var i = 0; i < message.length; i++) {
        if (message.charAt(i) === ":") {
            var emoticon = '';
            for (var e = i+1; e < message.length; e++) {
                if (message.charAt(e) !== ":"){
                    emoticon += message.charAt(e)
                } else {
                    break;
                }
            }
            emoticones.push(emoticon);
            i = e;
        }
    }
    return emoticones
}

function traducirEmoticones(emoticones, message){
    if (emoticones.length === 0) return message;
    console.log(emoticones);
    console.log(message);
    emoticones.forEach(function(emoticon) {
        emoticonJson.forEach(sEmoticon => {
            if (sEmoticon["short_name"] === emoticon) {
                console.log("Hola")
                message = message.replace(":" + emoticon + ":", "&#x" + sEmoticon["unified"])
            }
    })})
    console.log(message);
    return message;
}
