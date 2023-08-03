import { Request, Response, NextFunction } from 'express';
import Unauthorized from '@src/errors/Unauthorized';
import { jwtService } from '@src/services';
import BadRequest from '../errors/BadRequest';
import * as userService from '../services/user.service';
import Conflic from '../errors/Conflic';

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

export async function emailUnique(req:Request, _res:Response, next:NextFunction) {
  const { email } = req.body;

  const userFound = await userService.findUserByEmail(email);

  if (userFound) next(new Conflic('Email address already in use'));

  next();
}

export function emailFormat(req: Request, _res:Response, next:NextFunction) {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(email)) next(new BadRequest('Invalid Email format'));

  next();
}

export function passwordFormat(req: Request, _res:Response, next:NextFunction) {
  const { password } = req.body;

  if (password.length < 6) next(new BadRequest('Password need to have at least 6 characters'));

  next();
}

export function tokenRequired(req: Request, _res: Response, next:NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) next(new Unauthorized('Missing Token'));

  next();
}

export function tokenAuthenticity(req: Request, _res: Response, next:NextFunction) {
  const { authorization } = req.headers;

  jwtService.verifyToken(authorization as string);

  next();
}
