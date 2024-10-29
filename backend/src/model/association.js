const Breed = require("./breed");
const UserBreed = require("./userBreed");
const User = require("./user");

Breed.hasMany(UserBreed, { foreignKey: 'breedId', as: 'userBreeds' });
UserBreed.belongsTo(Breed, { foreignKey: 'breedId', as: 'breed' });
User.hasMany(UserBreed, { foreignKey: 'userId', as: 'userBreeds' });
UserBreed.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 