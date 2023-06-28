import express from 'express';
import loginRoutes from './routes/login.route';
import errorResponse from './middlwares/error.response';

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);

app.use(errorResponse);

export default app;
