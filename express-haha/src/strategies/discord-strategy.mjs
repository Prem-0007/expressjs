import passport from "passport";
import pkg from "passport-discord";
import dotenv from "dotenv";
import { DiscordUser } from "../mongoose/schemas/discord-user.mjs";
dotenv.config();

const { Strategy } = pkg;

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
  	scope: ["identify"],
		},
		async (accessToken, refreshToken, profile, done) => {
			let findUser;
			try {
				findUser = await DiscordUser.findOne({ discordId: profile.id });
			} catch (err) {
				return done(err, null);
			}
			try {
				if (!findUser) {
					const newUser = new DiscordUser({
						username: profile.username,
						discordId: profile.id,
					});
					const newSavedUser = await newUser.save();
					return done(null, newSavedUser);
				}
				return done(null, findUser);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);
passport.serializeUser((user, done) => {
  try {
    done(null, user._id.toString());
  } catch (err) {
    done(err, null);
  }
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await DiscordUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
export default passport;