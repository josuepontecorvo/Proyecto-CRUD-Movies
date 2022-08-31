const { Genre } = require("../database/models/")

const genresController = {

    list: async (req, res) => {
        try {
            const genres = await Genre.findAll();
            return res.render("./genres/genresList", { genres })
        } catch (error) {
            res.json(error.message)
        }
    },

    
    detail: async (req, res) => {
        try {
            const { id } = req.params
            const genre = await Genre.findByPk(id,{
                include: ['movies']
            });
            return res.render("./genres/genresDetail", { genre })
        } catch (error) {
            res.json(error.message)
        }
    }
};

module.exports = genresController;