const EstadoAr = require("../models/EstadoAr");

async function createOrUpdateAr(ar_id, temp) {
    try {
        await EstadoAr.upsert({ar_id, temp});

    } catch (error) {
        console.error(">> Erro ao adicionar um estado no banco: " + error);
    }
}

async function getAll() {
    estados = EstadoAr.findAll();

    console.log(estados);
    return estados;
}


module.exports = {
    createOrUpdateAr,
    getAll
}