import express from 'express';
import cors from 'cors';

import meRoutes from './routes/me.route';
import loginRoutes from './routes/login.route';
import registerRoutes from './routes/register.route';
import talkerRoutes from './routes/talker.route';
import lectureRoutes from './routes/lecture.route';
import errorResponse from './middlwares/error.response';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/me', meRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/talker', talkerRoutes);
app.use('/lecture', lectureRoutes);

app.use(errorResponse);

export default app;
