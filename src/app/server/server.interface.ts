import express from "express";
import { DBConnect } from "../resources/mongo.conf";

export interface ServerInterface {
  readonly app: express.Application;
  readonly options: ServerOptionsInterface;
  readonly db: DBConnect;
  init(): void;
  start(): void;
  stop(): void;
}

export interface ServerOptionsInterface {
  port: number;
}
