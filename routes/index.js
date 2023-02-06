import express, {Router} from 'express';

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});

export default router;
