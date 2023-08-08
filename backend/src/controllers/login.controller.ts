import type { Request, Response, NextFunction } from 'express';

import * as authService from '@services/auth.service';
import * as jwtService from '@services/jwt.service';

export async function authLogin(req:Request, res:Response, next:NextFunction) {
  const loginInput = req.body;
  try {
    const user = await authService.checkUserCredentials(loginInput);
    const token = await jwtService.tokenGenerator(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}
