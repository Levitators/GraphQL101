'use strict'

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import studentType from './student-schema'
import bookType from './book-schema'

export default new GraphQLObjectType({
    name: 'fetch_student_and_book',
    description: 'Fetch the students and books from DB',
    fields: () => ({
        student: {
            type: studentType,
            args: {
                email_id: {
                    type: GraphQLString,
                    default_value: () => null
                },
                user_id: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                department: {
                    type: GraphQLString,
                    default_value: () => null
                },
                username: {
                    type: GraphQLString,
                    default_value: () => null
                }
            },
            resolve: (root, args, context) => context.userFetcher.load({...args})
        },
        book: {
            type: bookType,
            args: {
                book_id: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                title: {
                    type: GraphQLString,
                    default_value: () => null
                },
                author: {
                    type: GraphQLString,
                    default_value: () => null
                },
                rent_id: {
                    type: GraphQLInt,
                    default_value: () => null
                }
            },
            resolve: (root, args, context) => context.bookFetcher.load({...args})
        }
    })
})
