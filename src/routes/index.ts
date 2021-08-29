import express from "express";
import participantRouter from "./Participant";
import roomRouter from "./Room";

const apiRouter = express.Router();

apiRouter.use("/room", roomRouter);
apiRouter.use("/participant", participantRouter);

export default apiRouter;
