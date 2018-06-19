import { importSchema } from "graphql-import";
import { GraphQLSchema } from "graphql";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import * as fs from "fs";

export const generateSchema = () => {
  const schemas: GraphQLSchema[] = [];
const folders: string[] = fs.readdirSync(path.join(__dirname, "../modules"));
folders.forEach(folder => {
  console.log('folder', folder)
  const { resolvers } = require(`../modules/${folder}/resolvers`);
  const typeDefs = importSchema(
    path.join(__dirname, `../modules/${folder}/schema.graphql`)
  );
  schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
});
return mergeSchemas({ schemas });
}
