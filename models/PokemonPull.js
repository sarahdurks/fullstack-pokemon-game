const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../config/connection');

// create Pokemon model
class PokemonPull extends Model { }

PokemonPull.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        imageSrc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        date: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pokemonPull'
    }
);

module.exports = PokemonPull;