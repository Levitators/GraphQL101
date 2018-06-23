import { verify } from 'jsonwebtoken'
import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';

export const isLoggedIn = (resolve: GraphQLFieldResolver<any, any, any>, parent: any, args: any, ctx: any, info: GraphQLResolveInfo): GraphQLFieldResolver<any, any, any> => {
  try {
    verify(ctx.request.get('Authorization'), process.env.JWT_SECRET as string);
    return resolve(parent, args, ctx, info)
  } catch (error) {
    throw new Error(`Not authorised`)
  }
}
