'use strict'

import Sequelize from 'sequelize'
import employeeModel from './employeeModel'

const db = {}
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    operatorsAliases: false
})

db.sequelize = sequelize
db.employee = employeeModel(sequelize, Sequelize)

export default db
