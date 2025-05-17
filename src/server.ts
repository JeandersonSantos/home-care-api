import express from 'express';
import helmet from 'helmet';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(helmet());

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  // origin: allowedOrigin,
  // credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
  
  server.on('error', (error) => {
    console.error('Erro no servidor:', error);
  });
}

export default app;