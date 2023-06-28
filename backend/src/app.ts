import express from 'express';
import loginRoutes from './routes/login.route';

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);

export default app;
