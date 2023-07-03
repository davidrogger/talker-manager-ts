import { Router } from 'express';
import jwtService from '../services/jwt.service';
import requiredField from '../middlwares/input.validation';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';

export {
  Router,
  jwtService,
  requiredField,
  authService,
  userService,
};
