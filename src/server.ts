import express from 'express';
import helmet from 'helmet';
import router from './routes';
import cors from 'cors';
const server = express();

server.use(helmet());

server.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true })); 

server.use('/', router);

server.listen(3001, () => {
  console.info('Serviço rodando: http://localhost:3001');
});
