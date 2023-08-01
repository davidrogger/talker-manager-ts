import { Router } from '.';
import { jwtService } from '../services';

const route = Router();

route.get('/', async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const user = jwtService.verifyToken(authorization);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

export default route;
