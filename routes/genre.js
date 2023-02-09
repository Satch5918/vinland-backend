import express from 'express';
let router = express.Router();
import validator from '../middlewares/validator.js';
import genre from '../schemas/genre.schema.js';
import controller from '../controllers/genre.controller.js';

const { create , read_all , read_one} = controller


  router.post('/',validator(genre),create)
  router.get('/',read_all)
  router.get('/:id',read_one)



  export default router;
