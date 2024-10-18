const Predio = require('../models/Predio');

class PredioService {
    static async createPredio(nome) {
        try {
            if (nome.length < 3 || nome.length > 50) {
                throw new Error('O nome do prédio deve ter entre 3 e 50 caracteres.');
            }

            return await Predio.create({ nome });
        } catch (error) {
            throw new Error('Erro ao criar o prédio: ' + error.message);
        }
    }

    static async updatePredio(nome, predio_id) {

        try {
            if (nome.length < 3 || nome.length > 50) {
                throw new Error('O nome do prédio deve ter entre 3 e 50 caracteres.');
            }

            const predio = await Predio.findByPk(predio_id);

            if (!predio) throw new Error('Prédio não encontrado.');
            
            const predioExistente = await Predio.findOne({ where: { nome } });
            
            if (predioExistente && predioExistente.id !== predio_id) {
                throw new Error('Já existe um prédio com esse nome.');
            }
            
            return await predio.update({ nome });
        } catch (error) {
            throw new Error('Erro ao atualizar o prédio: ' + error.message);
        }
    }

    static async deletePredio(predio_id) {

        try {
            const predio = await Predio.findByPk(predio_id)

            if (!predio) {
                throw new Error('Prédio não encontrado.')
            }

            return await predio.destroy()
        } catch (error) {
            throw new Error('Erro ao deletar o prédio: ' + error.message);
        }
    }

    
}

module.exports = PredioService;