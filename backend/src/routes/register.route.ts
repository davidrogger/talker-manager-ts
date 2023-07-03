import {
  Router, jwtService, userService,
} from '.';

const route = Router();

route.post('/', async (req, res, next) => {
  const registerInput = req.body;
  try {
    const user = await userService.createUser(registerInput);
    const token = await jwtService.tokenGenerator(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

export default route;
