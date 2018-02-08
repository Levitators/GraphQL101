'use strict'

import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
    name: 'book',
    description: 'Schema of a book object',
    fields: () => ({
        book_id: {
            type: GraphQLInt,
            resolve: book =>
                book._id
        },
        title: {
            type: GraphQLString,
            resolve: book =>
                book.title
        },
        author_id: {
            type: GraphQLString,
            resolve: book =>
                book.authorId
        },
        edition: {
            type: GraphQLString,
            resolve: book =>
                book.edition
        },
        rented: {
            type: GraphQLString,
            resolve: book =>
                book.rented
        }
    })
})
