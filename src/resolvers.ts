import { ResolverMap } from "./types/graphql-utils";
import { User } from "./entity/user"
export const resolvers: ResolverMap = {
  Query: {
    users: async () => {
      return Promise.resolve(await User.find());
  }
  },
  Mutation: {
    createUser: async (_, args: GQL.ICreateUserOnMutationArguments) => {
      const user = User.create(args);
      return Promise.resolve(await user.save());
    }
  }
};
