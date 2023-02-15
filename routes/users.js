import express from 'express'
import 'dotenv/config.js' 
import schema from '../schemas/signup.schema.js' 
import validator from '../middlewares/validator.js'
import accountExistsSignUp from '../middlewares/accountExistsSignUp.js'
import accountExistsSignIn from '../middlewares/accountExistsSignIn.js'
import accountHasBeenVerified from './../middlewares/accountHasBeenVerified.js'
import mustSignIn from '../middlewares/mustSignIn.js'
import controller from '../controllers/users.controller.js'
import passport from '../config/passport.js'

const { signup,signin,signin_token,signout,read, verify, read_one } = controller

let router = express.Router()
router.post('/signup', accountExistsSignUp, validator(schema),signup)
router.post('/signin', accountExistsSignIn,accountHasBeenVerified,signin)
router.post('/token',passport.authenticate('jwt', { session:false }),mustSignIn,signin_token)
router.put('/signout',passport.authenticate('jwt', { session:false }),signout)
router.put('/verify/:verify_code', verify)
router.get('/',read)
router.get("/user", passport.authenticate('jwt', { session:false }), read_one)

export default router