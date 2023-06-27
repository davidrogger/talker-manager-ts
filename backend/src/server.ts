import app from './app';

const PORT = Number(process.env.API_PORT) || 3001;
const HOSTNAME = process.env.API_HOSTNAME || 'localhost';

app.listen(
  PORT,
  HOSTNAME,
  () => console.log('🎢 Running App: %s:%s', HOSTNAME, PORT),
);
