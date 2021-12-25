import { NextFunction, Request, Response } from "express";
import { CustomError } from "../response/CustomError";

export const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.HttpStatusCode).json(err.JSON);
};
