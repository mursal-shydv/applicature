import { Logger } from "tslog";
import { ILogger } from "./logger.interface";

/** 
 * 
 * @description Pretty logging handler methods
 */
export default class Logs implements ILogger {
  public readonly log: Logger = new Logger();
  constructor() {}

  public print(message: string): void {
    this.log.info(message);
  }
  public trace(message: string): void {
    this.log.trace(message);
  }
  public warning(message: string): void {
    this.log.warn(message);
  }
  public error(message: string, error?: Error): void {
    this.log.error(message);
    if (error) {
      this.log.prettyError(error);
    }
  }
}
