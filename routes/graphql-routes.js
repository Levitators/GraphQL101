'use strict'

import Router from 'koa-router'
import graphqlHTTP from 'koa-graphql'
import jwt from 'koa-jwt'

const router = new Router()
let jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET
})

router.post('/graphql', jwtMiddleware, async (ctx) => {
    ctx.body = {status: 200, payload: [{message: 'GraphQL route implemented'}]}
})

/* router.post('/graphql', jwtMiddlewate, graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
})) */

export default router
