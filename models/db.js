'use strict'

import Sequelize from 'sequelize'
import studentsModel from './students-model'
import booksModel from './books-model'
import rentHistoryModel from './rent-history-model'

const db = {}
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    operatorsAliases: false
})

db.sequelize = sequelize
db.students = studentsModel(sequelize, Sequelize)
db.books = booksModel(sequelize, Sequelize)
db.rent_history = rentHistoryModel(sequelize, Sequelize)

export default db
