import express, { urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { mainRouter } from './routes/main';

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

server.use(mainRouter);

server.listen(process.env.PORT, () => {
    console.log("r");
});