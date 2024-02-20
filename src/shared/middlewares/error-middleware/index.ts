import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });

  next(err);
};
