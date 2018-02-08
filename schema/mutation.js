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
                student_name: {
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
        addBook: {
            type: bookType,
            args: {
                title: {
                    type: GraphQLString
                },
                author_id: {
                    type: GraphQLInt
                },
                edition: {
                    type: GraphQLString
                }
            },
            resolve: (root, args, context) => context.addBook.load({...args})
        },
        addAuthorAndBook: {
            type: bookType,
            args: {
                title: {
                    type: GraphQLString
                },
                author_name: {
                    type: GraphQLString
                },
                edition: {
                    type: GraphQLString
                }
            },
            resolve: (root, args, context) => context.addAuthorAndBook.load({...args})
        },
        rentBook: {
            type: bookType,
            args: {
                book_id: {
                    type: GraphQLInt
                },
                student_id: {
                    type: GraphQLInt
                },
                days: {
                    type: GraphQLInt
                }
            },
            resolve: (root, args, context) => context.bookRent.load({...args})
        },
        returnBook: {
            type: bookType,
            args: {
                book_id: {
                    type: GraphQLInt
                }
            },
            resolve: (root, args, context) => context.returnBook.load({...args})
        }
    })
})
