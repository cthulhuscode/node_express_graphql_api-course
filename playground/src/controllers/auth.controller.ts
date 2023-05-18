import { Request, Response } from "express";
import { AuthService, UsersService } from "../services";
import { Roles } from "../utils/roles";

const authService = new AuthService();
const userService = new UsersService();

export const login = async (req: Request, res: Response) => {
  let user: any = req.user!;

  user = {
    userId: user.id,
    customerId: user.role === Roles.Admin ? null : user.customer.id,
    role: user.role,
  };

  const data = authService.signToken(user);

  res.status(200).json({ ...data });
};

export const recoverAccount = async (req: Request, res: Response) => {
  const { email } = req.body;

  const response = await authService.sendPasswordRecovery(email);

  res.status(200).json({ ...response });
};

export const changePassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const response = await authService.changePassword(password, token);

  res.status(200).json({ ...response });
};

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  const user: any = req.user;

  if (user.sub.userId) {
    const authUser = await userService.findOne(+user.sub.userId);
    return res.status(200).json({ user: authUser });
  }

  res.status(401).json({ msg: "There is currently no authenticated user." });
};
