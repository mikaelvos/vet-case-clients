import { Request, Response } from 'express';

interface ResponseError extends Error {
  statusCode?: number;
}

/**
 * Middleware to handle errors
 * @param err - ErrorResponse object
 * @param req - Request object
 * @param res - Response object
 */
export function errorHandler(err: ResponseError, req: Request, res: Response): void {
  console.log('Middleware Error Handling');
  const errStatus: number = err.statusCode || 500;
  const errMsg: string = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
}
