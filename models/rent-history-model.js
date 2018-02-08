'use strict'

export default (sequelize, DataTypes) => {
    return sequelize.define('book_rent', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rented_days: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        returned: {
            type: DataTypes.BOOLEAN,
            required: true,
            allowNull: false
        }
    })
}
