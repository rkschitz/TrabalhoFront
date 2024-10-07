const database = require("../config/database");

class Image {
    constructor() {
        this.model = database.db.define("breeds", {
            imageId: {
                type: database.db.Sequelize.STRING,
                primaryKey: true
            },
            image: {
                type: database.db.Sequelize.STRING,
            }
        });
    }
}

module.exports = new Image().model;