import express from 'express';
import { Request, ErrorRequestHandler, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import hpp from 'hpp';
import helmet from 'helmet';
import config from '../config';

dotenv.config();
const app = express();

app.set('etag', false);
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('test express');
});

const { PORT } = config;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});