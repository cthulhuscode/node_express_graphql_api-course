import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "../../../config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.loginJwtSecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});
