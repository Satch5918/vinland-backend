import express  from "express";
import passport from "../config/passport.js";
import adminController from "../controllers/admin.controllers.js";
import isAdmin from '../middlewares/isAdmin.js'

const {updateLockUser, getUsers, deleteUser } = adminController

let router = express.Router()


router.put('/:id',passport.authenticate('jwt',{session: false}),isAdmin, updateLockUser)
router.get('/', passport.authenticate('jwt',{session: false}),isAdmin,getUsers)
router.delete('/:id',passport.authenticate('jwt',{session: false}),isAdmin,deleteUser)

export default router