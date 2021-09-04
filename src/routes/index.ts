import express from "express";
import { useAuth } from "../utils/middlewares";
import authRouter from "./Auth";
import participantRouter from "./Participant";
import participantRoom from "./ParticipantRoom";
import roomRouter from "./Room";

const apiRouter = express.Router();
apiRouter.use("/", authRouter);
apiRouter.use(useAuth());
apiRouter.use("/room", roomRouter);
apiRouter.use("/participant", participantRouter);
apiRouter.use("/proom", participantRoom);

export default apiRouter;
