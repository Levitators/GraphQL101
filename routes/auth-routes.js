'use strict'

import Router from 'koa-router'
import bcrypt from 'bcrypt'
import { JWTGenerator } from '../utils'
import db from '../models/db'

const router = new Router()

router.post('/login', async (ctx) => {
    const user = await db.students.find({where: {email_id: ctx.request.body.email_id}})
    if (user) {
        const validPass = await bcrypt.compare(ctx.request.body.password, user.password_hash)
        if (validPass) {
            ctx.body = {status: 200, payload: [{auth_token: JWTGenerator(user.id)}]}
        } else {
            ctx.body = {status: 401, payload: [{message: 'Password is not valid'}]}
        }
    } else {
        ctx.body = {status: 404, payload: [{message: 'User does not exist'}]}
    }
})

router.post('/register', async (ctx) => {
    const student = await db.students.find({
        where: {email_id: ctx.request.body.email_id}
    })
    if (student) {
        ctx.body = {status: 409, payload: [{message: 'User already exist'}]}
    } else {
        const hash = await bcrypt.hash(ctx.request.body.password, 10)
        const newOwner = await db.students.create({
            username: ctx.request.body.username,
            email_id: ctx.request.body.email_id,
            sex: ctx.request.body.sex,
            designation: ctx.request.body.designation,
            joined_date: ctx.request.body.joined_date,
            department: ctx.request.body.department,
            password_hash: hash
        })
        ctx.body = {status: 200, payload: [newOwner]}
    }
})

export default router
