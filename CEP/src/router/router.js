const express = require('express');
const { foundAdress } = require('../controller/cep');

const router = express();

router.get('/enderecos/:cep', foundAdress);

module.exports = router;