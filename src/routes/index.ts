import express from 'express';
import roomRouter from './Room';

const apiRouter = express.Router();


apiRouter.use('/room',roomRouter);


export default apiRouter;
