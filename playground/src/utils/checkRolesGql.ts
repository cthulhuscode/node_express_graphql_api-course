import boom from "@hapi/boom";
import { IUser } from "../interfaces";

export function checkRolesGql(user: IUser, ...roles: string[]) {
  if (!roles.includes(user.role)) {
    throw boom.forbidden("You're not allowed to access to this resource.");
  }
}
