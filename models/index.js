// import models
const User = require('./User');

const Highscore = require('./Highscore');


Highscore.belongsTo(User, {foreignKey: `user_id`});

module.exports = {
User,
// Pokemon,
// Poketype,
// Abilities,
Highscore
};
