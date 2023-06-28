import { Router } from 'express';
import jwtService from '../services/jwt.service';
import loginRequiredFields from '../middlwares/input.validation';

const route = Router();

route.post('/', loginRequiredFields, async (req, res, next) => {
  const loginInput = req.body;
  try {
    const token = await jwtService.tokenGenerator(loginInput);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default route;
