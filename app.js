import "dotenv/config.js";
import "./config/database.js";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import { __filename, __dirname} from './utils.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import './config/mercadopago.js'

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/api', indexRouter);



app.use(notFoundHandler)
app.use(errorHandler)

export default app;
