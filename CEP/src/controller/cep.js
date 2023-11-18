const fs = require('fs/promises');
const { buscarEndereco } = require('utils-playground');

const foundAdress = async (req, res) => {
    const { cep } = req.params;
    if (isNaN(Number(cep))) {
        return res.status(400).json({ erro: 'CEP invalid' });
    }

    try {
        const existsCep = await fs.readFile('./src/enderecos.json');
        const parseCep = JSON.parse(existsCep) 
        const existCep = parseCep.find((address) => {
            return address.cep === cep;
        });

        if(existCep){
            return res.json(existCep);
        }
        if(!existCep){
            const newAddress = await buscarEndereco(cep);
            
            parseCep.push(newAddress);

            await fs.writeFile('./src/enderecos.json', JSON.stringify(parseCep, null, 2));
            return res.status(200).json(newAddress);
        }   
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    foundAdress,
}