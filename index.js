'use strict'

import './dotenv'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import authRoutes from './routes/auth-routes'
import graphqlRoute from './routes/graphql-routes'
import db from './models/db'

const app = new Koa()

app.use(bodyParser())
app.use(authRoutes.routes())
app.use(graphqlRoute.routes()).use(graphqlRoute.allowedMethods())

app.use(async ctx => {
    ctx.body = ctx.request.body
});

(async () => {
    try {
        await db.sequelize.authenticate()
        app.listen(process.env.PORT, () => {
            db.sequelize.sync()
            console.log(`App running at ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
})()
