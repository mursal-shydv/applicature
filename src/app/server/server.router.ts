import express from "express";
import RecordsRouter from "../routes/home.class";
import RouterInterface from "../shared/router.interface";
const router = express.Router();

export default class ServerRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    this.router.use("/", new RecordsRouter().getRouter());
  }
}
