const express = require('express');
const router = express.Router();
const multer = require('multer');
const readFile = require('../parser/index.js');
const buildTrapdoor = require('../global/trapdoor');
const decryptJson = require('../global/decrypt_json');
const NodeRSA = require('node-rsa');
const HarvastedReport = require('../models/harvasted_report');
const User = require('../models/user');


router.all('/upload-harvested', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

  router.all('/get-upload-harvested', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'storage/uploads/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


router.post('/upload-harvested', upload.single('file'), async (req, res) => {
    if (req.body['date'] == undefined) {
        return res.status(400).json('Please put date as parameter, parameter: date xxxx-xx-xx');
    }

    if (req.file) {
        const fileParsed = await readFile(req.file.path);
        const fileEncryped = await encryptJson(fileParsed);

        if (fileEncryped == null) {
            return res.status(400).json('The user you entered does not have a public key ');
        }

        const userAddressee = getUserAdresse(fileParsed);
        const title = createTitle(req.body['date']);
        const trapdoorTitle = buildTrapdoor(title);

        // Insert into database
        HarvastedReport.create({
            title: trapdoorTitle,
            addressee: userAddressee,
            content: fileEncryped,
        }).then(result => {
            return res.json(result);
        }).catch((error) => {
            return res.json(error);
        });

    } else {
        return res.json("File cannot be null! , parameter: file");
    }


});

router.post('/get-upload-harvested', async (req, res) => {
    if (req.body['title'] == undefined) {
        return res.status(400).json('Please put an input field, title in the query')
    }
    console.log("req.body  " , req.body)

    const trapdoorTitle = buildTrapdoor(req.body['title']);
    const allReports = await HarvastedReport.findAll({
        where: { title: trapdoorTitle }
    });

    if (allReports.length == 0) {
        return res.status(200).json("Without results");
    }

    if (req.body['private_key'] == undefined) {
        return res.status(200).json(allReports);
    }

    const decryptedInformation = await decryptJson(allReports, req.body['private_key']);
    if (decryptedInformation == null) {
        return res.status(200).json("Invalid or malformed private key");
    }
    return res.status(200).json(decryptedInformation);
});


const encryptJson = async (stringToEncrypt) => {
    const obj = JSON.parse(stringToEncrypt);

    if (obj['Machine']['MachineUserID'] == undefined) {
        return null;
    }

    const user = await User.findOne({
        where: {
            username: obj['Machine']['MachineUserID']
        }
    });

    if (user != null) {
        var key = new NodeRSA({ b: 256 });
        key.setOptions({ encryptionScheme: 'pkcs1' });
        key.importKey(user['public_key']);

        if (key.isPublic())
            console.log('Key is public');

        try {
            const encrypted = key.encrypt(stringToEncrypt, 'base64');
            return encrypted;
        }
        catch (err) {
            return null;
        }
    }
    return null;


}


const getUserAdresse = (stringToEncrypt) => {
    const obj = JSON.parse(stringToEncrypt);
    return obj['Machine']['MachineUserID'];
}


/* create the title of row */
const createTitle = (date) => {
    return 'harvasted_' + date
}

module.exports = router;