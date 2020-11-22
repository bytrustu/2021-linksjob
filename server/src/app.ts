import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import config from './config';
import { errorHandler, logHandler } from './modules/handler';
import { IErr } from './type/Interfaces';
import { processJobplanet, processKreditjob, processSaramin, processWanted, screenShot } from './modules/crawler';

const app = express();
const { PORT } = config;

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  next();
});

app.set('etag', false);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logHandler);
app.use(errorHandler);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const result = await processWanted('카카오');
  console.log(result);
});

app.use((err: IErr, req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});