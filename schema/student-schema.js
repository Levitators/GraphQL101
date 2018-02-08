'use strict'

import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
    name: 'student',
    description: 'Schema of the student object',

    fields: () => ({
        student_name: {
            type: GraphQLString,
            resolve: user =>
                user.student_name
        },
        _id: {
            type: GraphQLInt,
            resolve: user =>
                user._id
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
