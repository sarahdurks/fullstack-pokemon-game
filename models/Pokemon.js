const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../config/connection');

// create Pokemon model
class Pokemon extends Model { }

Pokemon.init(
    {
        pokedex: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        pokemon_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pokemon_pic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE   
            }
        },
        selected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pokemon'
    }
);

module.exports = Pokemon;