import { NextFunction, Request, Response } from 'express';

import HttpError from '@errors/HttpError';

export default (error:HttpError, _req: Request, res:Response, _next:NextFunction) => {
  res.status(error.status || 500).json({ message: error.message });
};
