import passport from 'passport'
import passportJwt from 'passport-jwt'
import { User } from '../models/User.js'
import 'dotenv/config.js'
const { KEY_JWT } = process.env

passport.use(
    new passportJwt.Strategy( //definimos la estrategia de extraccion de jwt
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(), // de tipo bearer
            secretOrKey: KEY_JWT //con la clave secreta
        }, //la estrategia devuelve la extraccion en un objeto: jwt_payload
        async (jwt_payload,done) => {
            //console.log(jwt_payload)
            try {
                let user = await User.findOne({ _id:jwt_payload.id }) //buscamos el usuario
                if (user) {
                    user = { //este es el objeto user que se "inyecta" al req
                        //aqui es donde protejo los datos del usuario
                        email: user.email,
                        name: user.name,
                        is_admin: user.is_admin,
                        is_buyer: user.is_buyer,
                        is_verified: user.is_verified,
                        id: user._id
                    }
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error,false)
            }
        }
    )
)

export default passport