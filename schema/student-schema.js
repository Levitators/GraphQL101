'use strict'

import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
    name: 'student',
    description: 'Schema of the student object',

    fields: () => ({
        username: {
            type: GraphQLString,
            resolve: user =>
                user.username
        },
        user_id: {
            type: GraphQLInt,
            resolve: user =>
                user.user_id
        },
        department: {
            type: GraphQLString,
            resolve: user =>
                user.department
        },
        joined_date: {
            type: GraphQLString,
            resolve: user =>
                user.joined_date
        },
        email_id: {
            type: GraphQLString,
            resolve: user =>
                user.email_id
        }
    })
})
