'use strict'

import Sequelize from 'sequelize'
import studentsModel from './students-model'
import booksModel from './books-model'
import rentHistoryModel from './rent-history-model'
import authors from './author-model'

const db = {}
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    operatorsAliases: false
})

db.sequelize = sequelize
db.students = studentsModel(sequelize, Sequelize)
db.books = booksModel(sequelize, Sequelize)
db.rent_history = rentHistoryModel(sequelize, Sequelize)
db.authors = authors(sequelize, Sequelize)

db.books.belongsTo(db.authors)
db.rent_history.belongsTo(db.books)
db.rent_history.belongsTo(db.students)

export default db
