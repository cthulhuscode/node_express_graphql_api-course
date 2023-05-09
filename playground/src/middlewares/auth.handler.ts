import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";

export function checkRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user!;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden("You're not authorized to access to this resource."));
    }
  };
}
