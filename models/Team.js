const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../config/connection');
const uuid = require('uuid');

// create Pokemon model
class Team extends Model { 

}

Team.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team_logo: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        // pokemon_count: {
        //     type: DataTypes.INTEGER,
        //     defaultValue: 0,
        //     allowNull: true,
        //     validate: {
        //         max: 6 
        //     }
        // },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'team'
    }
);

module.exports = Team;