import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { guestSession } from './middleware/guestSession';
import { errorHandler } from './middleware/errorHandler';
import { apiRouter } from './routes';

export const app = express();

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Cross-origin resource sharing
app.use(cors({
  origin: [env.CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Guest cart session token
app.use(guestSession);

// Mount API
app.use('/api/v1', apiRouter);

// Centralized error handler
app.use(errorHandler);
