import { NotFound, serverError } from "../utils/http-helper";
import express, { Request, Response, NextFunction } from "express";

export default (app: express.Application): void => {
  /** Handle router endpoint that are not defined */
  app.use((request: Request, response: Response, next: NextFunction) => {
    response.json(NotFound());
  });
  /** Handle any internal error */
  app.use((err: any, request: Request, response: Response, next: NextFunction) => {
    console.error(err);
    response.status(500).json(serverError(err));
  });
};
