
const buildKeys = () =>{

  const crypto = require("crypto");

  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {

    modulusLength: 2048,
  });
  
  const exportedPublicKeyBuffer = publicKey.export({
      type: "pkcs1",
      format: "pem",
    });
    
    const exportedPrivateKeyBuffer = privateKey.export({
      type: "pkcs1",
      format: "pem",
    });

  return {private_key: exportedPrivateKeyBuffer, public_key:exportedPublicKeyBuffer }
}

  module.exports =  buildKeys ;