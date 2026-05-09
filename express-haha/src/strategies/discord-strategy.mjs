import passport from "passport";
import pkg from "passport-discord";
import dotenv from "dotenv";

dotenv.config();
const { Strategy } = pkg;

export default passport.use(
    new Strategy({
       clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackUrl:" http://localhost:3000/api/auth/discord/redirect",
        scope:["identify", "guilds"],
    }, (accessToken, refreshToken, profile, done) =>{
  console.log(profile)
    })
)