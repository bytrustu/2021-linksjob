import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';
import { errorHandler, logHandler } from './modules/handler';
import processRouter from './routes/processRouter';
import companyRouter from './routes/companyRouter';


const app = express();
const { PORT } = config;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

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

app.use('/api/process', processRouter);
app.use('/api/company', companyRouter);

app.use(logHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🔥 Running on Port ${PORT}`);
});

export default app;