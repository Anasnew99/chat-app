import { Request, Response, NextFunction } from "express";
import { sendResponse } from ".";
import { AUTH_ERROR } from "../config/constants";
import { ITokenData, verifyToken } from "./authUtils";
export const useAuth = () => {
  return async (
    req: Request,
    res: Response<{}, { claims: ITokenData }>,
    next: NextFunction
  ) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
          const data = await verifyToken(token);
          res.locals.claims = data;
        } else {
          throw AUTH_ERROR;
        }
      } else {
        throw AUTH_ERROR;
      }

      next();
    } catch (error) {
      return sendResponse(res, error);
    }
  };
};
