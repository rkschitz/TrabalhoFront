// models/UserTemperaments.js
const database = require("../config/database");

class BreedTemperament {
  constructor() {
    this.model = database.db.define("breeds_temperaments", {
        id: {
            type: database.db.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
      breedId: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: 'breeds', // O nome da tabela do modelo User
          key: 'breedId'
        },
        allowNull: false
      },
      temperamentId: {
        type: database.db.Sequelize.STRING,
        references: {
          model: 'temperaments', // O nome da tabela do modelo Temperament
          key: 'temperamentId'
        },
        allowNull: false
      }
    });
  }
}

module.exports = new BreedTemperament().model;
