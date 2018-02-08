'use strict'

import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
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
                student_id: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                department: {
                    type: GraphQLString,
                    default_value: () => null
                },
                student_name: {
                    type: GraphQLString,
                    default_value: () => null
                }
            },
            resolve: (root, args, context) => context.userFetcher.load({...args})
        },
        book: {
            type: new GraphQLList(bookType),
            args: {
                _id: {
                    type: GraphQLInt,
                    default_value: () => null
                },
                title: {
                    type: GraphQLString,
                    default_value: () => null
                },
                authorId: {
                    type: GraphQLInt,
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
