import { authSecret } from '../../.env'
import { Strategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import db from '../database/connection'

const opts = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

export default class AuthenticateController {
    index() {
        const strategy = new Strategy(opts, (payload, done) => {
            db('users').where({ email: payload })
                .then(user => {
                    if (user.length <= 0) done('Ocorreu um erro, tente fazer login novamente.', false)

                    done(null, { id: user[0].id, email: user[0].email })
                })
                .catch(err => done(err, false))
        })

        passport.use(strategy)
    
        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false }),
        }
    }
}