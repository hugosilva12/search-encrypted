const express = require('express');
const router = express.Router();
const buildKeys = require('../global/generate_key');

router.all('/generate-keys', function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
   next();
 });


router.get('/generate-keys', async (req, res) => {
   const generateKeys = buildKeys();
   console.log(generateKeys['private_key']);
   return  res.status(200).json(generateKeys);
  });


  module.exports = router;