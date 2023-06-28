import { Router } from 'express';
import jwtService from '../services/jwt.service';

const route = Router();

route.post('/', async (req, res) => {
  const loginInput = req.body;
  try {
    const token = await jwtService.tokenGenerator(loginInput);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default route;
