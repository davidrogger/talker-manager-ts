import { Router } from '.';

import { jwtService, authService } from '../services';
import { validate } from '../middlwares';

const route = Router();

route.post('/', validate.loginRequiredFields, async (req, res, next) => {
  const loginInput = req.body;
  try {
    const user = await authService.checkUserCredentials(loginInput);
    const token = await jwtService.tokenGenerator(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default route;
