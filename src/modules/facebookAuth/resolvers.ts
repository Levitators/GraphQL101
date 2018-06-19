import { ResolverMap } from "../../types/graphql-utils"
import { facebookUser, user, createUser } from "../users/resolvers"
import { genToken } from "../../utils/jwtTokenGenerator"
import axios from "axios"

interface FacebookUser {
  id: string
  email: string
  first_name: string
}

interface AuthResponse {
  user: User,
  auth_token: string
}

interface ErrorPayload {
  message: string
  error: any
}

interface User {
  id: number
  email: string
  googleUserId: string
  facebookUserId: string
  username: string
}

export const resolvers: ResolverMap = {
  Mutation: {
    AuthenticateFacebookUser: async (_, {facebookToken}: GQL.IAuthenticateFacebookUserOnMutationArguments): Promise<AuthResponse | ErrorPayload> => {
      try {
        const facebookUserDetails = await getFacebookUserDetails(facebookToken)
        const { id: facebookUserId, email, first_name: username } = facebookUserDetails
        const foundUser = await checkUserExists(facebookUserId, email)
        if(foundUser) {
          return Promise.resolve({
            auth_token: genToken(foundUser.id),
            user: foundUser
          })
        } else {
          const createdUser = await createUser({email, facebookUserId, username, googleUserId: ""})
          return Promise.resolve({
            auth_token: genToken(createdUser.id),
            user: createdUser
          })
        }
      } catch(error) {
        return Promise.reject({
          message: 'Auth failed',
          error
        })
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

async function checkUserExists(facebookUserId: string, email: string): Promise<User | undefined> {
  let foundUser = await facebookUser(facebookUserId)
  if(!foundUser) {
    foundUser = await user(email)
  }
  return Promise.resolve(foundUser)
}


