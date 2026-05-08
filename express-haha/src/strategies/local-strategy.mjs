import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log("Inside Serialize User");
  console.log(user);

  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside Deserialize User");
 // console.log(`deserializeUser ID: ${id}`);

  try {
    const findUser = users.find((user) => user.id === id);

    if (!findUser) {
      throw new Error("User Not Found");
    }

    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const findUser = users.find(
        (user) => user.username === username
      );

      if (!findUser) {
        throw new Error("User Not Found");
      }

      if (findUser.password !== password) {
        throw new Error("Invalid Credentials");
      }

      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

export default passport;