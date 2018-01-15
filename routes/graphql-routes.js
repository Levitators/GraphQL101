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
        return db.books.find({where: id})
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
                username: id.username,
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
        const hasBooks = await db.rent_history.find({where: {user_id: req.user_id, returned: false}})
        if (hasBooks === null || hasBooks.length < 3) {
            const bookRent = await db.rent_history.create({
                user_id: req.user_id,
                book_id: req.book_id,
                rented_days: req.days,
                date: (new Date()).toISOString().substring(0, 10),
                returned: false
            })
            await db.books.update({rented: true, rent_id: bookRent.id}, {where: {book_id: req.book_id}})
            return db.books.find({where: {book_id: req.book_id}})
        }
    } catch (e) {
        console.log('Error', e)
    }
}

const userFetcher = new DataLoader(keys => Promise.all(keys.map(fetchUser)))

const bookFetcher = new DataLoader(keys => Promise.all(keys.map(fetchBook)))

const userRegister = new DataLoader(keys => Promise.all(keys.map(registerUser)))

const bookRent = new DataLoader(keys => Promise.all(keys.map(rentBook)))

router.all('/graphql', graphqlHTTP({
    schema: schema,
    context: {
        userFetcher,
        bookFetcher,
        userRegister,
        bookRent
    },
    graphiql: true
}))

export default router
