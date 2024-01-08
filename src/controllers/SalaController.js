
class SalaController {
    async index (req, res) {
        try{
            res.render('sala/index');
        }catch (error) {
            console.log(error);
        }
    }
    
    async create (req, res) {
        try {   
            res.render('sala/create');
        } catch (error) {
            console.log(error);
        }   
    }

    async edit(req, res) {
        try {
            res.render('sala/edit');
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    async delete (req, res) {
        try{

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new SalaController();