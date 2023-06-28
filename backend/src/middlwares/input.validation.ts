import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/BadRequest';

export default function loginRequiredFields(req:Request, _res:Response, next:NextFunction) {
  const login = req.body;

  if (!login.email) next(new BadRequest('Missing email field'));
  if (!login.password) next(new BadRequest('Missing password field'));

  next();
}
