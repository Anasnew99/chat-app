import express from "express";
import participantRouter from "./Participant";
import participantRoom from "./ParticipantRoom";
import roomRouter from "./Room";

const apiRouter = express.Router();

apiRouter.use("/room", roomRouter);
apiRouter.use("/participant", participantRouter);
apiRouter.use("/proom", participantRoom);

export default apiRouter;
