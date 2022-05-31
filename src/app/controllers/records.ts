import { Request } from "express";
import DBModel from "../models/model.class";
import { DataAccess } from "../resources/data-access";
import { IResponse } from "../models/response.interface";
import Validator from "../utils/validators/body-validator";
import { ok, serverError, validationError } from "../utils/http-helper";

export default class HomeController {
  private readonly validator: Validator = new Validator();
  private readonly dataAccess: DataAccess = new DataAccess(DBModel);

  /**
   * 
   * @description records controller
   * @param request request object
   * @returns user response
   */
  public async getRecords(request: Request): Promise<IResponse> {
    try {
      let body = request.body;
      let missingParams = this.validator.missingParams(request);
      if (missingParams.length) return validationError(missingParams);
      let records: any = await this.dataAccess.fetchRecords(body);
      return ok(records);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
