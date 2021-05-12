// import models
const User = require('./User');
const Pokemon = require('./Pokemon');
const Team = require('./Team');
const PokemonPull = require('./PokemonPull');



const Highscore = require('./Highscore');

// Model Associations
User.hasOne(Team, { foreignKey: 'user_id' });

Team.belongsTo(User, { foreignKey: 'user_id' });

Team.hasMany(Pokemon);

PokemonPull.hasMany(Pokemon);

Pokemon.belongsTo(Team, { foreignKey: 'team_id' });

Highscore.belongsTo(User, { foreignKey: `user_id` });



module.exports = {
    User,
    Pokemon,
    Team,
    Highscore,
    PokemonPull
};
