import {
  Router, jwtService, userService, validate,
} from '.';

const route = Router();

route.post(
  '/',
  validate.newUserRequiredFields,
  validate.emailUnique,
  async (req, res, next) => {
    const registerInput = req.body;
    try {
      const user = await userService.createUser(registerInput);
      const token = await jwtService.tokenGenerator(user);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  },
);

export default route;
