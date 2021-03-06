import { importSchema } from "graphql-import";
import { GraphQLSchema } from "graphql";
import { applyMiddleware } from 'graphql-middleware'
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import * as fs from "fs";

export const generateSchema = ():GraphQLSchema  => {
  const schemas: GraphQLSchema[] = [];
const folders: string[] = fs.readdirSync(path.join(__dirname, "../modules"));
folders.forEach(folder => {
  const { resolvers } = require(`../modules/${folder}/resolvers`);
  const typeDefs = importSchema(
    path.join(__dirname, `../modules/${folder}/schema.graphql`)
  );
  const dummySchemea = makeExecutableSchema({ resolvers, typeDefs })
  const { permissions } = require(`../modules/${folder}/permissions`);
  schemas.push(applyMiddleware(dummySchemea, permissions));
});
return mergeSchemas({ schemas });
}
