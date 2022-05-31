import { IResponse, record } from "../models/response.interface";

export const NotFound = (): IResponse => ({
  code: 404,
  msg: "Endpoint not found, please check your path or the method",
});

export const serverError = (error: Error): IResponse => ({
  code: 500,
  msg: "Internal Server Error Occured: " + error.message,
});

export const validationError = (details: string[]): IResponse => ({
  code: 400,
  msg: "Parameter validation error. details: [" + details.join(", ") + "]",
});

export const ok = (records: record[]): IResponse => ({
  code: records.length ? 0 : 1,
  msg: records.length ? "Success" : "No Record found",
  records: records,
});
