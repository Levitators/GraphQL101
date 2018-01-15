'use strict'

export default (sequelize, DataTypes) => {
    return sequelize.define('books', {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING(120),
            required: true,
            allowNull: false

        },
        edition: {
            type: DataTypes.STRING(50),
            required: true,
            allowNull: false
        },
        rented: {
            type: DataTypes.BOOLEAN,
            required: true,
            allowNull: false
        },
        rent_id: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: true
        }
    })
}
