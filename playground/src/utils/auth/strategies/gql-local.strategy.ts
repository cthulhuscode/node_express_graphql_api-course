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
