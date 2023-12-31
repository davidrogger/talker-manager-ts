import { Request, Response, NextFunction } from 'express';

import * as jwtService from '@services/jwt.service';
import * as userService from '@services/user.service';
import * as talkerService from '@services/talker.service';
import * as lectureService from '@services/lecture.service';

import Unauthorized from '@errors/Unauthorized';
import BadRequest from '@errors/BadRequest';
import Conflic from '@errors/Conflic';

export function newUserRequiredFields(req:Request, _res:Response, next:NextFunction) {
  const user = req.body;
  try {
    if (!user.firstName) throw new BadRequest('Missing firstName field');
    if (!user.lastName) throw new BadRequest('Missing lastName field');
    if (!user.email) throw new BadRequest('Missing email field');
    if (!user.password) throw new BadRequest('Missing password field');
    next();
  } catch (error) {
    next(error);
  }
}

export function loginRequiredFields(req:Request, _res:Response, next:NextFunction) {
  const login = req.body;

  try {
    if (!login.email) throw new BadRequest('Missing email field');
    if (!login.password) throw new BadRequest('Missing password field');
    next();
  } catch (error) {
    next(error);
  }
}

export async function emailUnique(req:Request, _res:Response, next:NextFunction) {
  const { email } = req.body;

  try {
    const userFound = await userService.findUserByEmail(email);
    if (userFound) throw new Conflic('Email address already in use');
    next();
  } catch (error) {
    next(error);
  }
}

export function emailFormat(req: Request, _res:Response, next:NextFunction) {
  const { email } = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  try {
    if (!emailRegex.test(email)) throw new BadRequest('Invalid Email format');
    next();
  } catch (error) {
    next(error);
  }
}

export function passwordFormat(req: Request, _res:Response, next:NextFunction) {
  const { password } = req.body;

  try {
    if (password.length < 6) throw new BadRequest('Password need to have at least 6 characters');
    next();
  } catch (error) {
    next(error);
  }
}

export function tokenRequired(req: Request, _res: Response, next:NextFunction) {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new Unauthorized('Missing Token');
    next();
  } catch (error) {
    next(error);
  }
}

export function tokenAuthenticity(req: Request, _res: Response, next:NextFunction) {
  const { authorization } = req.headers;

  try {
    jwtService.verifyToken(authorization as string);
    next();
  } catch (error) {
    next(error);
  }
}
export function talkerNameField(req: Request, _res: Response, next:NextFunction) {
  const { name } = req.body;
  try {
    if (!name) throw new BadRequest('Missing name field');
    if (name.length < 3) throw new BadRequest('Name should has at least 3 characters');
    next();
  } catch (error) {
    next(error);
  }
}

export function talkerAgeField(req: Request, _res: Response, next:NextFunction) {
  const { age } = req.body;
  try {
    if (!age) throw new BadRequest('Missing age field');
    if (Number.isNaN(Number(age))) throw new BadRequest('Age need to be a number');
    if (age < 0) throw new BadRequest('Insert a valid age');
    next();
  } catch (error) {
    next(error);
  }
}

export function lectureTalkerNameField(req: Request, _res: Response, next: NextFunction) {
  const { talkerName } = req.body;

  if (!talkerName) throw new BadRequest('Missing field "talkerName"');
  if (talkerName.length < 3) throw new BadRequest('talkerName need at least 3 characters');

  next();
}

export function lectureTitleField(req: Request, _res: Response, next: NextFunction) {
  const { title } = req.body;

  if (!title) throw new BadRequest('Missing field "title"');
  if (title.length < 5) throw new BadRequest('title need at least 5 characters');

  next();
}

export function lectureWatchedAtField(req: Request, _res: Response, next: NextFunction) {
  const { watchedAt } = req.body;

  if (!watchedAt) throw new BadRequest('Missing field "watchedAt"');

  const regexData = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regexData.test(watchedAt)) throw new BadRequest('watchedAt need a valid format, dd/mm/yyyy');

  next();
}

export async function talkerParamsIdExists(
  req:Request,
  _res:Response,
  next:NextFunction,
) {
  const { id } = req.params;
  try {
    await talkerService.findTalkerById(id);
    next();
  } catch (error) {
    next(error);
  }
}

export async function talkerBodyIdExists(
  req:Request,
  _res:Response,
  next:NextFunction,
) {
  const { talkerId } = req.body;
  try {
    await talkerService.findTalkerById(talkerId);
    next();
  } catch (error) {
    next(error);
  }
}

export async function lectureIdExists(
  req:Request,
  _res:Response,
  next:NextFunction,
) {
  const { id } = req.params;
  try {
    await lectureService.findLectureById(id);
    next();
  } catch (error) {
    next(error);
  }
}
