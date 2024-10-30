const express = require('express');
const router = express.Router();
const User = require('../models/user');
const NodeRSA = require('node-rsa');


router.all('/user', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.post("/user", async (req, res) => {

  const isValidKey = validateKey(req.body['public_key']);

  if (!isValidKey) {
    return res.status(400).json("Invalid public key");
  }

  await User.create(req.body)
    .then(() => {
      return res.json({
        erro: false,
        mensagem: "User has been created"
      });
    }).catch((error) => {
      return res.status(400).json({
        erro: true,
        mensagem: error
      });
    });
});


router.get('/user', async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
});

const validateKey = (public_key) => {
  var key = new NodeRSA({ b: 256 });
  key.setOptions({ encryptionScheme: 'pkcs1' });
  try {

    key.importKey(public_key);

    return true;
  } catch (err) {
    console.log("err " , err)
    return false;
  }
}



module.exports = router;