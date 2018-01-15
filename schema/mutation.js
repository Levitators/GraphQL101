'use strict'

import { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLNonNull, GraphQLInt } from 'graphql'
import studentType from './student-schema'
import bookType from './book-schema'

const sexEnum = new GraphQLEnumType({
    name: 'SexEnum',
    values: {
        M: {
            value: 'M'
        },
        F: {
            value: 'F'
        }
    }
})

export default new GraphQLObjectType({
    name: 'student_register',
    description: 'Register a new student to the database',
    fields: () => ({
        createStudent: {
            type: studentType,
            args: {
                email_id: {
                    type: GraphQLString
                },
                department: {
                    type: GraphQLString
                },
                username: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                joined_date: {
                    type: GraphQLString
                },
                sex: {
                    type: GraphQLNonNull(sexEnum)
                }
            },
            resolve: (root, args, context) => context.userRegister.load({...args})
        },
        rentBook: ({
            type: bookType,
            args: {
                book_id: {
                    type: GraphQLInt
                },
                user_id: {
                    type: GraphQLInt
                },
                days: {
                    type: GraphQLInt
                }
            },
            resolve: (root, args, context) => context.bookRent.load({...args})
        })
    })
})
