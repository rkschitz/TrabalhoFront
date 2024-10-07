const database = require("../config/database");

class Breed {
    constructor() {
        this.model = database.db.define("breeds", {
            breedId: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            breed: {
                type: database.db.Sequelize.STRING,
            },
            weight: {
                type: database.db.Sequelize.STRING,
            },
            height: {
                type: database.db.Sequelize.STRING,
            }
        });
    }
}

module.exports = new Breed().model;