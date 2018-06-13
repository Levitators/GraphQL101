
import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import * as path from "path";
import * as dotenv from 'dotenv-safe';
dotenv.config()

import { resolvers } from "./resolvers";

const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection()
  .then(() => {
    server.start(() => console.log(`Server is running on localhost:${process.env.PORT}`));
  })
  .catch((e) => {
    console.log('Unable to connect to the database', e)
  });
  