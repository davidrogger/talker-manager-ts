import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/login.route';
import registerRoutes from './routes/register.route';
import errorResponse from './middlwares/error.response';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.use(errorResponse);

export default app;
