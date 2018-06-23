import { isLoggedIn } from '../../utils/authMiddleware'

export const permissions = {
  Query: {},
  Mutation: {
    createUser: isLoggedIn
  }
}
