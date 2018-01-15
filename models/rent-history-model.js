'use strict'

export default (sequelize, DataTypes) => {
    return sequelize.define('book_rent', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        book_id: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
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
