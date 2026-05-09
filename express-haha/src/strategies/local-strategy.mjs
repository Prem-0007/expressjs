import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {

    const findUser = await User.findById(id);

    if (!findUser) {
      return done(null, false);
    }

    done(null, findUser);

  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {

    try {

      const findUser = await User.findOne({ username });

      if (!findUser) {
        return done(null, false);
      }

      if (!comparePassword(password, findUser.password)){
        return done(null, false);
      }

      done(null, findUser);

    } catch (err) {
      done(err, null);
    }

  })
);

export default passport;