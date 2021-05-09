// import models
const User = require('./User');
const Pokemon = require('./Pokemon');
const Team = require('./Team');


const Highscore = require('./Highscore');

// Model Associations
User.hasMany(Pokemon, { foreignKey: 'user_id' });

Pokemon.belongsTo(User, { foreignKey: 'user_id' });

Team.belongsTo(User, { foreignKey: 'user_id' });

Pokemon.belongsTo(Team, { foreignKey: 'team_id' });

Team.hasMany(Pokemon, { foreignKey: 'team_id' });

Highscore.belongsTo(User, { foreignKey: `user_id` });

User.hasOne(Team, { foreignKey: 'user_id' });

module.exports = {
    User,
    Pokemon,
    Team,
    Highscore
};
