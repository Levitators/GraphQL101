
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { generateSchema } from "./utils/generateSchema";
import * as dotenv from 'dotenv-safe';
dotenv.config()


const server = new GraphQLServer({ schema: generateSchema() });
createConnection()
  .then(() => {
    server.start(() => console.log(`Server is running on localhost:${process.env.PORT}`));
  })
  .catch((e) => {
    console.log('Unable to connect to the database', e)
  });
  