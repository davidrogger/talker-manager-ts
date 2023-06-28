import { Router } from 'express';
import jwtService from '../services/jwt.service';
import loginRequiredFields from '../middlwares/input.validation';
import * as authService from '../services/auth.service';

const route = Router();

route.post('/', loginRequiredFields, async (req, res, next) => {
  const loginInput = req.body;
  try {
    await authService.checkUserCredentials(loginInput);
    const token = await jwtService.tokenGenerator(loginInput);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default route;
