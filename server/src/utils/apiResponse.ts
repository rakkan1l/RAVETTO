import { Response } from 'express';

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200, meta?: any) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
    meta,
  });
}

export function sendError(res: Response, message: string, statusCode = 500, errors?: any) {
  return res.status(statusCode).json({
    success: false,
    error: message,
    errors,
  });
}
