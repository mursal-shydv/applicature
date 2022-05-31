import http from "http";
import express from "express";
import Logs from "../service/logger";
import bodyParser from "body-parser";
import ErrorHandling from "./server.error";
import ServerRouter from "./server.router";
import { DBConnect } from "../resources/mongo.conf";
import { ServerInterface, ServerOptionsInterface } from "./server.interface";

export default class Server implements ServerInterface {
  public readonly db: DBConnect;
  public readonly app: express.Application;
  private readonly logger: Logs = new Logs();
  private serverInitialized: boolean = false;
  public readonly options: ServerOptionsInterface;
  private serverListener: http.Server | undefined = undefined;

  constructor(options: ServerOptionsInterface) {
    this.app = express();
    this.options = options;
    this.db = new DBConnect();
  }

  /**
   * @description start the express server and listen to the port 
   * @returns boolean value if server is up and running
   */
  public start(): boolean {
    let serverStart: boolean = false;
    try {
      this.init();
      this.serverListener = this.app.listen(this.options.port, () => {
        this.logger.print(
          `Server is running on http://localhost:${this.options.port}`
        );
      });
    } finally {
      serverStart = true;
    }
    return serverStart;
  }

  /**
   * @description Initialize middlewares and set router
   */
  public init(): void {
    if (!this.serverInitialized) {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.setAppRouter();
      this.serverInitialized = true;
    }
  }

  /**
   * @description Method to stop the server
   */
  public stop(): void {
    this.serverListener!.close();
  }

  /**
   * @description Single app router
   */
  private setAppRouter(): void {
    this.app.use("/", new ServerRouter().getRouter());
    ErrorHandling(this.app);
  }
}
