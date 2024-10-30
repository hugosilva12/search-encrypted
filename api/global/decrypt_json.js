const NodeRSA = require('node-rsa');
const decryptJson = async (allReports, private_key) => {

    var keyD = new NodeRSA({ b: 256 });
    keyD.setOptions({ encryptionScheme: 'pkcs1' });

    if (!private_key.includes("-----BEGIN RSA PRIVATE KEY-----")) {
        private_key = '-----BEGIN RSA PRIVATE KEY-----' + private_key;
    }

    if (!private_key.includes("-----END RSA PRIVATE KEY-----")) {
        private_key = private_key + '-----END RSA PRIVATE KEY-----';
    }
    console.log('Private key ' , private_key)
    try {
        keyD.importKey(private_key);
    }
    catch (err) {
        return null;
    }

    let objToReturn = [];
    for (let i = 0; i < allReports.length; i++) {
        try {
            allReports[i]['content'] = JSON.parse(keyD.decrypt(allReports[i]['content'], 'utf8'));
            objToReturn.push(allReports[i]);
        }
        catch (err) {
            //objToReturn.push(allReports[i]);
        }
    }

    return objToReturn;
}

module.exports =  decryptJson ;