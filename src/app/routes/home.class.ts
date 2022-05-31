import Controller from "../controllers/records";
import express, { Request, Response } from "express";
import { IResponse } from "../models/response.interface";
import RouterInterface from "../shared/router.interface";
const router = express.Router();

export default class RecordsRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    const controller = new Controller();

    /**
     * Single route for post method
     */
    this.router.post("/", async (request: Request, response: Response) => {
      const data: IResponse = await controller.getRecords(request);
      response.json(data);
    });
  }
}
