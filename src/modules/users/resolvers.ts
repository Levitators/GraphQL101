import { ResolverMap } from "../../types/graphql-utils"
import { UserEntity } from "../../entity/user"

interface User {
  id: number
  email: string
  googleUserId: string
  facebookUserId: string
  username: string
}

export const facebookUser = async (facebookUserId: string): Promise<User | undefined> => {
  console.log(facebookUserId)
  return Promise.resolve(await UserEntity.findOne({ where: { facebookUserId } }))
}

export const user = async (email: string): Promise<User | undefined> => {
  return Promise.resolve(await UserEntity.findOne({ where: { email } }))
}

export const createUser = async (newUser: GQL.ICreateUserOnMutationArguments): Promise<User> => {
  const createdUser = UserEntity.create(newUser);
  return Promise.resolve(await createdUser.save());
}

export const resolvers: ResolverMap = {
  Query: {
    users: async (): Promise<User[]> => {
      return Promise.resolve(await UserEntity.find());
    },
    facebookUser: async (_, { facebookUserId }: GQL.IFacebookUserOnQueryArguments): Promise<User | undefined> => {
      return Promise.resolve(await facebookUser(facebookUserId))
    },
    user: async (_, { email }: GQL.IUserOnQueryArguments): Promise<User | undefined> => {
      return Promise.resolve(await user(email))
    }
  },
  Mutation: {
    createUser: async (_, args: GQL.ICreateUserOnMutationArguments): Promise<User> => {
      return Promise.resolve(await createUser(args))
    }
  }
};
