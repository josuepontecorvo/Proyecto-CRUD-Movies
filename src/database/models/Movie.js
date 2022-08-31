const moment = require('moment');
module.exports = (sequelize, DataTypes) => {

    const alias = "Movie";

    const cols = { 
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false  
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false 
        },
        rating: {
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false,
        },
        awards: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,  
            defaultValue: 0
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('release_date')).format("YYYY-MM-DD")},
        },
        length: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,  
            defaultValue: null
        },
        genre_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,  
            defaultValue: null
        }
    }

    const config = {
        tableName: 'movies',
        timestamps: false
    };


    const Movie = sequelize.define(alias, cols, config);
    Movie.associate = function(models){
        Movie.belongsTo(models.Genre, {
            as: 'genre', 
            foreignKey: 'genre_id' 
        }),
        Movie.belongsToMany(models.Actor, {
            as: 'actors', 
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }
    return Movie;
}