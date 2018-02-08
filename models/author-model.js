'use strict'

export default (sequelize, DataTypes) => {
    return sequelize.define('authors', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        }
    })
}
