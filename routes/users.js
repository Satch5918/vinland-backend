import express from 'express';
import controller from '../controllers/users.controller.js'

let router = express.Router();
const { signup,signin,signintoken,signout,read } = controller


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
