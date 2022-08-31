const { Actor } = require("../database/models");

const actorsController = {
    list: async (req, res) => {
        try {
            const actors = await Actor.findAll();
            return res.render("./actors/actorsList", { actors })
        } catch (error) {
            return res.json(error.message);
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const actor = await Actor.findByPk(id, {
                include: ['movies']
            });
            return res.render("./actors/actorsDetail", { actor })
        } catch (error) {
            return res.json(error.message);
        }
    }
}

module.exports = actorsController