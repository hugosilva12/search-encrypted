const crypto = require('crypto');

// key
const key = 'd8cf040f93d60f4a95a162468873749439b805c0186d150a84fac309b850ff1b29b751f887e66b681c919f811f246917ed16349f0cdec91dc6f8b17080e7ed63d90b792923a36b598a10c18669f05a41ae69b290f1998bbd0ec18370328f29893cd218b258bfb107bda6154abb3b7fa9ed9c0d646f3dd3d773fa0c88b03a3c71eb735ac3fade27e131db653f5d9093a9a3d5485d965a95a0534eda992844f3acfd4769b08399cbe901b8dd1a6ff42b8080624ecfb86f5e34eb880f560732be99d4718077dc3ef36dad3998931738e1917fc1f916c712c3c269a291d5bac7b6e072c53d968f93f62a2df04ffbbd329da5f26263efbbe8473ddb669b6be8ad93cf'

/*
   Utilidade no projeto: destinatario do conteudo dos ficheiros sabe as datas em que a maquina trabalhou
*/
const buildTrapdoor = (searchToken) => {
    const trapdoor = crypto.createHmac('sha256', key).update(searchToken).digest('hex');
    return trapdoor;
}

module.exports =  buildTrapdoor ;