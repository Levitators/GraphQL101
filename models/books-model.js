'use strict'

export default (sequelize, DataTypes) => {
    return sequelize.define('books', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        edition: {
            type: DataTypes.STRING(120),
            required: true,
            allowNull: false
        },
        rented: {
            type: DataTypes.BOOLEAN,
            required: true,
            allowNull: false
        }
    })
}
