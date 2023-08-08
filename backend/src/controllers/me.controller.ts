import type { Request, Response, NextFunction } from 'express';

import * as jwtService from '@services/jwt.service';

export async function getUserData(req:Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;
  try {
    const user = jwtService.verifyToken(authorization as string);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}
