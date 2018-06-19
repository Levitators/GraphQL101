import { ResolverMap } from "../../types/graphql-utils"
import { UserEntity } from "../../entity/user"
import { facebookUser, user, createUser } from "../users/resolvers"
import axios from "axios"

interface FacebookUser {
  id: string
  email: string
  first_name: string
}

interface User {
  id: number
  email: string
  googleUserId: string
  facebookUserId: string
  username: string
}

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }) => `Bye ${name || "World"}`
  },
  Mutation: {
    AuthenticateFacebookUser: async (_, { facebookToken }) => {
      const myUser = await getFacebookUserDetails(facebookToken)
      const foundUser = await checkUserExists(myUser.id, myUser.email)
      if (foundUser.length) {
        // TODO Generate JWT token
      } else {
        // Create user and generate JWT token for that user
      }
    }
  }
};

async function getFacebookUserDetails(facebookToken: string): Promise<FacebookUser> {
  const endpoint = `https://graph.facebook.com/v3.0/me?fields=id%2Cemail%2Cfirst_name&access_token=${facebookToken}`
  try {
    return Promise.resolve(await axios.get<FacebookUser>(endpoint).then(response => response.data))
  } catch (error) {
    return Promise.reject(JSON.stringify(error))
  }
}

async function checkUserExists(facebookUserId: string, email: string): Promise<User[]> {
  let foundUser = await facebookUser(facebookUserId)
  if (!foundUser.length) {
    foundUser = await user(email)
  }
  return Promise.resolve(foundUser)
}


