import passport from "passport";
import { GQLLocalStrategy, JwtStrategy, LocalStrategy } from "./strategies";

passport.use(LocalStrategy);
passport.use(GQLLocalStrategy);
passport.use(JwtStrategy);

export default passport;
