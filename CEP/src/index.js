const express = require('express');
const router = require('./router/router');

const app = express();

app.use(express.json());

app.use(router);

app.listen(3000, () => {
    console.log('Servidor inicializado http://localhost:3000/enderecos');
});