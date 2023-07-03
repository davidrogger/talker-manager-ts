import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/BadRequest';

export function newUserRequiredFields(req:Request, _res:Response, next:NextFunction) {
  const user = req.body;

  if (!user.firstName) next(new BadRequest('Missing firstName field'));
  if (!user.lastName) next(new BadRequest('Missing lastName field'));
  if (!user.email) next(new BadRequest('Missing email field'));
  if (!user.password) next(new BadRequest('Missing password field'));

  next();
}

export function loginRequiredFields(req:Request, _res:Response, next:NextFunction) {
  const login = req.body;

  if (!login.email) next(new BadRequest('Missing email field'));
  if (!login.password) next(new BadRequest('Missing password field'));

  next();
}

export default {
  login: loginRequiredFields,
  newUser: newUserRequiredFields,
};
