'use strict'

import Router from 'koa-router'
import graphqlHTTP from 'koa-graphql'
import DataLoader from 'dataloader'
import jwt from 'koa-jwt'
import schema from '../schema/index'
import db from '../models/db'
import bcrypt from 'bcrypt'

const router = new Router()

const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET
})

const fetchUser = (id) => {
    try {
        return db.students.find({where: id})
    } catch (e) {
        console.log('Error', e)
    }
}

const fetchBook = (id) => {
    try {
        return db.books.findAll({where: id})
    } catch (e) {
        console.log('Error', e)
    }
}

const registerUser = async (id) => {
    try {
        const oldUser = await db.students.find({where: {email_id: id.email_id}})
        if (!oldUser) {
            const hash = await bcrypt.hash(id.password, 10)
            return db.students.create({
                student_name: id.student_name,
                email_id: id.email_id,
                sex: id.sex,
                designation: id.designation,
                joined_date: id.joined_date,
                department: id.department,
                password_hash: hash
            })
        }
    } catch (e) {
        console.log('Error', e)
    }
}

const rentBook = async (req) => {
    try {
        const book = await db.books.find({where: {_id: req.book_id}})
        if (!book.rented) {
            const hasBooks = await db.rent_history.findAll({where: {studentId: req.student_id, returned: false}})
            if (hasBooks.length < 3) {
                await db.rent_history.create({
                    studentId: req.student_id,
                    bookId: req.book_id,
                    rented_days: req.days,
                    date: (new Date()).toISOString().substring(0, 10),
                    returned: false
                })
                await db.books.update({rented: true}, {where: {_id: req.book_id}})
                return db.books.find({where: {_id: req.book_id}})
            }
        }
    } catch (e) {
        console.log('Error', e)
    }
}

const addNewBook = async (req) => {
    try {
        return db.books.create({
            title: req.title,
            authorId: req.author_id,
            edition: req.edition,
            rented: false,
            rent_id: null
        })
    } catch (e) {
        console.log('Error', e)
    }
}

const addNewAuthorAndBook = async (req) => {
    try {
        const author = await db.authors.create({author_name: req.author_name})
        return db.books.create({
            title: req.title,
            authorId: author._id,
            edition: req.edition,
            rented: false,
            rent_id: null
        })
    } catch (e) {
        console.log(e)
    }
}

const bookReturn = async (req) => {
    try {
        const book = await db.books.find({where: {_id: req.book_id}})
        if (book.rented) {
            await db.rent_history.update({returned: true}, {where: {bookId: req.book_id, returned: false}})
            await db.books.update({rented: false}, {where: {_id: req.book_id}})
            return db.books.find({where: {_id: req.book_id}})
        }
    } catch (e) {
        console.log(e)
    }
}

const userFetcher = new DataLoader(keys => Promise.all(keys.map(fetchUser)))

const bookFetcher = new DataLoader(keys => Promise.all(keys.map(fetchBook)))

const userRegister = new DataLoader(keys => Promise.all(keys.map(registerUser)))

const bookRent = new DataLoader(keys => Promise.all(keys.map(rentBook)))

const addBook = new DataLoader(keys => Promise.all(keys.map(addNewBook)))

const addAuthorAndBook = new DataLoader(keys => Promise.all(keys.map(addNewAuthorAndBook)))

const returnBook = new DataLoader(keys => Promise.all(keys.map(bookReturn)))

router.all('/graphql', graphqlHTTP({
    schema: schema,
    context: {
        userFetcher,
        bookFetcher,
        userRegister,
        bookRent,
        addBook,
        addAuthorAndBook,
        returnBook
    },
    graphiql: true
}))

export default router
