import express from 'express';
import passport from '../config/passport.js';
import isAdmin from '../middlewares/isAdmin.js'
let router = express.Router();
import validator from '../middlewares/validator.js';
import genre from '../schemas/genre.schema.js';
import controller from '../controllers/genre.controller.js';

const { create , read_all , read_one} = controller


  router.post('/',passport.authenticate('jwt',{session: false}),isAdmin,validator(genre),create)
  router.get('/',read_all)
  router.get('/:id',read_one)



  export default router;
