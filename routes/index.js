import express, {Router} from 'express';
import users from './users.js'
import admin from './admin.router.js'

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});

router.use('/users',users)
router.use('/admin',admin)


export default router;
