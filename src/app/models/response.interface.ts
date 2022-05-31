export interface IResponse {
  code: number;
  msg: string;
  records?: Array<record>;
}

export interface record {
  key: string;
  createdAt: string;
  totalCount: string;
}
