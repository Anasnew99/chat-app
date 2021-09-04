import jwt from "jsonwebtoken";
import { AUTH_ERROR, HTTP_Status, NOT_EXIST_ERROR } from "../config/constants";
import { IParticipant, Participant } from "../controllers/Participant";

export interface ITokenData {
  id: string;
  participantId: string;
}

export interface IUser {
  password?: string;
  participantId: string;
}

const SECRET_KEY = process.env.AUTH_SECRET_KEY;

export const verifyUser = (data: IUser) => {
  return new Promise(async (resolve: (data: ITokenData) => any, reject) => {
    try {
      const participant = await Participant.findOne({
        participantId: data.participantId,
      });
      if (participant) {
        if (participant.password) {
          if (participant.password === data.password) {
            resolve({
              participantId: participant.participantId,
              id: participant._id,
            });
          } else {
            reject(AUTH_ERROR);
          }
        } else {
          resolve({
            participantId: participant.participantId,
            id: participant._id,
          });
        }
      } else {
        throw NOT_EXIST_ERROR;
      }
    } catch (error) {
      const newParticipant = new Participant(data);
      newParticipant
        .save()
        .then(() => {
          resolve({
            participantId: newParticipant.participantId,
            id: newParticipant._id,
          });
        })
        .catch(() => {});
      reject(error);
    }
  });
};

export const generateToken = (data: ITokenData) => {
  return new Promise(
    (resolve: (token: string) => any, reject: (err: Error) => any) => {
      jwt.sign(data, SECRET_KEY, (err, token) => {
        if (!err) {
          resolve(token);
        } else {
          reject(err);
        }
      });
    }
  );
};

export const verifyToken = (token: string) => {
  return new Promise(
    (
      resolve: (decodedData: ITokenData) => any,
      reject: (err: HTTP_Status) => any
    ) => {
      jwt.verify(token, SECRET_KEY, (err, decoded: ITokenData) => {
        if (!err) {
          resolve(decoded);
        } else {
          reject(AUTH_ERROR);
        }
      });
    }
  );
};
