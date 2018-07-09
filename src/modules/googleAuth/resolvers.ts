import { ResolverMap } from "../../types/graphql-utils"
import { googleUser, user, createUser } from "../users/resolvers"
import { genToken } from "../../utils/jwtTokenGenerator"
import axios from "axios"

interface GoogleUser {
  sub: string
  email: string
  given_name: string
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
    AuthenticateGoogleUser: async (_, { googleToken }: GQL.IAuthenticateGoogleUserOnMutationArguments): Promise<AuthResponse | ErrorPayload> => {
      try {
        const googleUserDetails = await getGoogleUserDetails(googleToken)
        const { sub: googleUserId, email, given_name: username } = googleUserDetails
        const foundUser = await checkUserExists(googleUserId, email)
        if (foundUser) {
          return Promise.resolve({
            auth_token: genToken(foundUser.id),
            user: foundUser
          })
        } else {
          const createdUser = await createUser({ email, googleUserId, username, facebookUserId: "" })
          return Promise.resolve({
            auth_token: genToken(createdUser.id),
            user: createdUser
          })
        }
      } catch (error) {
        return Promise.reject({
          message: 'Auth failed',
          error
        })
      }
    }
  }
};

async function getGoogleUserDetails(googleToken: string): Promise<GoogleUser> {
  const endpoint = `https://www.googleapis.com/oauth2/v3/tokeninfo?fields=email%2Csub%2Cgiven_name&id_token=${googleToken}`
  try {
    return Promise.resolve(await axios.get<GoogleUser>(endpoint).then(response => response.data))
  } catch (error) {
    return Promise.reject(JSON.stringify(error))
  }
}

async function checkUserExists(googleUserId: string, email: string): Promise<User | undefined> {
  let foundUser = await googleUser(googleUserId)
  if (!foundUser) {
    foundUser = await user(email)
  }
  return Promise.resolve(foundUser)
}
