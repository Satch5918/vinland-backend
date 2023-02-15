import express  from "express";
import passport from "../config/passport.js";
import adminController from "../controllers/admin.controllers.js";
import isAdmin from '../middlewares/isAdmin.js'

const {update_lock_user, get_users, delete_user } = adminController

let router = express.Router()


router.put('/:id',passport.authenticate('jwt',{session: false}),isAdmin, update_lock_user)
router.get('/', passport.authenticate('jwt',{session: false}),isAdmin,get_users)
router.delete('/:id',passport.authenticate('jwt',{session: false}),isAdmin,delete_user)

export default router