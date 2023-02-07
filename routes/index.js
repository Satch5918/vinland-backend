import express from 'express';
let router = express.Router();
import purchase from './purchase.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});

router.use('/purchase', purchase)

export default router;
