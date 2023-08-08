import type { Request, Response, NextFunction } from 'express';

import * as jwtService from '@services/jwt.service';
import * as encryptService from '@services/encrypt.service';
import * as userService from '@services/user.service';
import * as idService from '@services/id.service';

export async function getUserData(req:Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;
  try {
    const user = jwtService.verifyToken(authorization as string);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req:Request, res:Response, next:NextFunction) {
  const registerInput = req.body;
  try {
    const encryptedPassword = await encryptService.encryptPassword(registerInput.password);
    const id = idService.generateId();
    const newUser = { id, ...registerInput, password: encryptedPassword };
    const user = await userService.createUser(newUser);
    const token = await jwtService.tokenGenerator(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}
