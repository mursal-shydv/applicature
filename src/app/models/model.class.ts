import { model, Schema } from "mongoose";
import { IResponse } from "./response.interface";

export default model<IResponse>("records", new Schema({}));
