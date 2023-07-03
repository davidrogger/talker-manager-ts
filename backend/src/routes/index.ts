import { Router } from 'express';
import jwtService from '../services/jwt.service';
import * as validate from '../middlwares/input.validation';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';

export {
  Router,
  jwtService,
  validate,
  authService,
  userService,
};
