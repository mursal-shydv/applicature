import { Model } from "mongoose";
import { IRequest } from "../models/request.interface";
import { IResponse } from "../models/response.interface";

export class DataAccess {
  private db: Model<IResponse>;

  constructor(db: Model<IResponse>) {
    this.db = db;
  }

  /**
   * @description fetch records from mongoDB based on user request parameters
   * @param payload user request parameters
   * @returns list of records if any
   */
  public async fetchRecords(payload: IRequest): Promise<object[]> {
    const records = await this.db.aggregate([
      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: {
            $sum: "$counts",
          },
        },
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(payload.startDate),
            $lte: new Date(payload.endDate),
          },
          totalCount: {
            $gte: payload.minCount,
            $lte: payload.maxCount,
          },
        },
      },
    ]);
    return records;
  }
}
