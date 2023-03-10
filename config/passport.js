import { User } from "../models/User.model.js"
import passport from "passport"
import passportJwt from "passport-jwt"

const { KEY_JWT } = process.env

passport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest:
                passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT,
        },
        async (jwt_payload, done) => {
            try {
                let user = await User.findOne({ _id: jwt_payload.id })
                if (user) {
                    user = {
                        id: user._id,
                        mail: user.mail,
                        is_admin: user.is_admin,
                    }
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error, false)
            }
        }
    )
)

export default passport
