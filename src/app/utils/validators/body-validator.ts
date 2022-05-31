import { Request } from "express";

/**
 * @description body parameter validation class
 */
export default class Validator {
  public missingParams(request: Request): string[] {
    const params = [];
    if (!request.body.startDate || !this.validDate(request.body.startDate)) {
      params.push("startDate");
    }
    if (!request.body.endDate || !this.validDate(request.body.endDate)) {
      params.push("endDate");
    }
    if (!request.body.minCount || typeof(request.body.minCount) !== "number") {
      params.push("minCount");
    }
    if (!request.body.maxCount || typeof(request.body.maxCount) !== "number") {
      params.push("maxCount");
    }
    return params;
  }

  /**
   * 
   * @description checks if the date format is yyyy-mm-dd formatted
   * @param date date in the string format
   * @returns boolean value if date is in correct format
   */
  private validDate(date: string) {
    let reg = /^\d{4}-\d{2}-\d{2}$/;
    return date.match(reg) != null;
  }
}
