import express, {Router} from 'express';
import users from './users.js'
import admin from './admin.router.js'
import buyers from './buyers.route.js'

let router = express.Router();
import product from './product.js'
import genre from './genre.js';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});

router.use('/users',users)
router.use('/admin',admin)
router.use('/buyer',buyers)


router.use('/product',product)
router.use('/genre',genre)

export default router;
