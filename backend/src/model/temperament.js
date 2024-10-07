const database = require("../config/database");

class Temperament {
  constructor() {
    this.model = database.db.define("temperaments", {
        temperamentId: {
        type: database.db.Sequelize.STRING,
        primaryKey: true
      },
      temperament: {
        type: database.db.Sequelize.STRING,
      }
    });
  }
}

module.exports = new Temperament().model;