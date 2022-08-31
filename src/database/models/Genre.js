module.exports = (sequelize, DataTypes) => {

    const alias = "Genre";

    const cols = { 
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false  
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false 
        },
        ranking: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN ,
            allowNull: false,
            defaultValue: 1
        }
    }

    const config = {
        tableName: 'genres',
        timestamps: false
    };


    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function (models) {
        Genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genre_id'
        })
        
    }
    return Genre;
}