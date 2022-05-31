import "mocha";
import { assert } from "chai";
import request from "supertest";
import { serverAppStarted, serverApp } from "./app";

describe("Application server tests", () => {
  it("Should start the server", async () => {
    assert.isTrue(serverAppStarted);
  });
});

describe("Testing endpoints", () => {
  it("Should return method or endpoint not found for GET", async () => {
    const res = await request(serverApp.app).get("/");
    assert.equal(res.body.code, 404);
    assert.equal(
      res.body.msg,
      "Endpoint not found, please check your path or the method"
    );
  });
  it("Should return method or endpoint not found for PUT", async () => {
    const res = await request(serverApp.app).put("/");
    assert.equal(res.body.code, 404);
    assert.equal(
      res.body.msg,
      "Endpoint not found, please check your path or the method"
    );
  });
  it("Should return method or endpoint not found for DELETE", async () => {
    const res = await request(serverApp.app).delete("/");
    assert.equal(res.body.code, 404);
    assert.equal(
      res.body.msg,
      "Endpoint not found, please check your path or the method"
    );
  });
  it("Should return validation error for missing any body parameters", async () => {
    const res = await request(serverApp.app).post("/");
    assert.equal(res.body.code, 400);
    assert.equal(
      res.body.msg,
      "Parameter validation error. details: [startDate, endDate, minCount, maxCount]"
    );
  });
  it("Should return validation error when startDate/endDate has wrong date formats", async () => {
    const res = await request(serverApp.app).post("/").send({
      startDate: "25-12-2016",
      endDate: "2016/02/02",
      minCount: 2700,
      maxCount: 2500,
    });
    assert.equal(res.body.code, 400);
    assert.equal(
      res.body.msg,
      "Parameter validation error. details: [startDate, endDate]"
    );
  });
  it("Should return validation error when minCount/maxCount is not a number", async () => {
    const res = await request(serverApp.app).post("/").send({
      startDate: "2016-01-01",
      endDate: "2016-02-02",
      minCount: true,
      maxCount: "2500",
    });
    assert.equal(res.body.code, 400);
    assert.equal(
      res.body.msg,
      "Parameter validation error. details: [minCount, maxCount]"
    );
  });
  it("Should return empty records for wrong date times", async () => {
    const res = await request(serverApp.app).post("/").send({
      startDate: "2017-01-01",
      endDate: "2016-02-02",
      minCount: 2500,
      maxCount: 2600,
    });
    assert.equal(res.body.code, 1);
    assert.equal(res.body.msg, "No Record found");
    assert.isEmpty(res.body.records);
  });
  it("Should return empty records for wrong min and max counts", async () => {
    const res = await request(serverApp.app).post("/").send({
      startDate: "2015-01-01",
      endDate: "2016-02-02",
      minCount: 2600,
      maxCount: 2500,
    });
    assert.equal(res.body.code, 1);
    assert.equal(res.body.msg, "No Record found");
    assert.isEmpty(res.body.records);
  });
  it("Should return empty records for sum of value not being in the min and max range", async () => {
    const res = await request(serverApp.app).post("/").send({
      startDate: "2015-01-01",
      endDate: "2016-02-02",
      minCount: 55000,
      maxCount: 70000,
    });
    assert.equal(res.body.code, 1);
    assert.equal(res.body.msg, "No Record found");
    assert.isEmpty(res.body.records);
  });
  it("Should return records successfully", async () => {
    const res = await request(serverApp.app).post("/").send({
      startDate: "2015-12-01",
      endDate: "2016-01-02",
      minCount: 2500,
      maxCount: 2700,
    });
    assert.equal(res.body.code, 0);
    assert.equal(res.body.msg, "Success");
    assert.isNotEmpty(res.body.records);
  });
});
