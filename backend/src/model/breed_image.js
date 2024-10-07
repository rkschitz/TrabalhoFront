// models/UserTemperaments.js
const database = require("../config/database");

class BreedImage {
  constructor() {
    this.model = database.db.define("breeds_images", {
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
      imageId: {
        type: database.db.Sequelize.STRING,
        references: {
          model: 'images', // O nome da tabela do modelo Temperament
          key: 'imageId'
        },
        allowNull: false
      }
    });
  }
}

module.exports = new BreedImage().model;
