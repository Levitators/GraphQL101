// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
users: Array<IUser>;
}

interface IUser {
__typename: "User";
id: number;
email: string;
googleUserId: string;
facebookUserId: string;
username: string;
}

interface IMutation {
__typename: "Mutation";
createUser: IUser | null;
}

interface ICreateUserOnMutationArguments {
email: string;
googleUserId: string;
facebookUserId: string;
username: string;
}
}

// tslint:enable
