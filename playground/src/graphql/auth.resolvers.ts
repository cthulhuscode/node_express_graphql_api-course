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
