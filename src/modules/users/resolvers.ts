import { ResolverMap } from "../../types/graphql-utils"
import { UserEntity } from "../../entity/user"

interface User {
  id: number
  email: string
  googleUserId: string
  facebookUserId: string
  username: string
}

export const facebookUser = async (facebookUserId: string): Promise<User[]> => {
  return Promise.resolve(await UserEntity.find({ where: { facebookUserId } }))
}

export const user = async (email: string): Promise<User[]> => {
  return Promise.resolve(await UserEntity.find({ where: { email } }))
}

export const createUser = async ({ email, googleUserId = "", facebookUserId = "", username = "" }: { email: string; googleUserId?: string; facebookUserId?: string; username?: string }): Promise<User> => {
  const createdUser = UserEntity.create({
    email,
    googleUserId,
    facebookUserId,
    username
  });
  return Promise.resolve(await createdUser.save());
}

export const resolvers: ResolverMap = {
  Query: {
    users: async (): Promise<User[]> => {
      return Promise.resolve(await UserEntity.find());
    },
    facebookUser,
    user
  },
  Mutation: {
    createUser: async (_, args: GQL.ICreateUserOnMutationArguments): Promise<User> => {
      return Promise.resolve(await createUser(args))
    }
  }
};
