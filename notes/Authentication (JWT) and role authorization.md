# Authentication (JWT)

## Login with GraphQL

To handle authentication with GraphQL we must install the package:

    pnpm add graphql-passport

Then we create a new stategy:

    import { GraphQLLocalStrategy } from "graphql-passport";
    import { AuthService } from "../../../services";

    const service = new AuthService();

    export const GQLLocalStrategy = new GraphQLLocalStrategy(
      async (email, password, cb) => {
        try {
          const user = await service.handleLogin(
            email as string,
            password as string
          );

          // Invalid credentials
          if (!user) cb(null, false);

          // User is added to the request
          cb(null, user);
        } catch (error) {
          // Send error
          cb(error);
        }
      }
    );

The next step is to add the strategy to passport:

    import passport from "passport";
    import { GQLLocalStrategy, JwtStrategy, LocalStrategy } from "./strategies";

    passport.use(LocalStrategy);
    passport.use(GQLLocalStrategy); // <----
    passport.use(JwtStrategy);

    export default passport;

Then we create a new context using the method `buildContext()` that comes from the `graphql-passport` package. When integrating the current express server with the ApolloServer we create, a `context` function is passed, which builds the `context` object for each GraphQL resolver. The context function receives the `req` and `res` objects and returns the context object.

    app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
      })
    );

_See `./src/graphql/index.ts`_

---

After configuring Passport and GraphqQL, then we can create a login mutation:

    type Mutation {
      login(email: String!, password: String!): LoginResponse
    }

the resolver for the login mutation in _`auth.resolvers.ts`_:

    import { AuthService } from "../services";
    import { Roles } from "../utils/roles";
    const service = new AuthService();

    export const login = async (
      _: any,
      { email, password }: { email: string; password: string },
      context: any
    ) => {
      let { user } = await context.authenticate("graphql-local", {
        email,
        password,
      });

      user = {
        userId: user.id,
        customerId: user.role === Roles.Admin ? null : user.customer.id,
        role: user.role,
      };

      const data = service.signToken(user);

      return data;
    };

We get the `context` sent to the resolver where we can find the `authenticate` method which we use to authenticate the user.

---

## Check if user is authenticated

To check if user is authenticated we can create a function called `checkJwtGql` inside the _utils_ folder.

    import boom from "@hapi/boom";

    export async function checkJwtGql(context: any) {
      const { user } = await context.authenticate("jwt", { session: false });

      if (!user) {
        throw boom.unauthorized("JWT token not valid.");
      }

      return user;
    }

The function uses the `context` sent by the resolver and uses the same JWT strategy created to validate if the Authorization token comes in the request and if it is valid.

Finally we call the function inside a resolver:

    export const addCategory = async (_: any, { dto }: any, context: any) => {
      // If token is not valid will throw a boom error
      const user = await checkJwtGql(context);
    }

# Role authorization

To check if an user has the enough permissions to access a route, we can create the `checkRolesGql` function:

    import boom from "@hapi/boom";
    import { IUser } from "../interfaces";

    export function checkRolesGql(user: IUser, ...roles: string[]) {
      if (!roles.includes(user.role)) {
        throw boom.forbidden("You're not allowed to access to this resource.");
      }
    }

Then we can use the function in a resolver:

    export const addCategory = async (_: any, { dto }: any, context: any) => {
      // If token is not valid will throw a boom error
      const user = await checkJwtGql(context);

      // If role not authorized will throw a boom error
      checkRolesGql(user, Roles.Admin);

      return service.create(dto);
    };
