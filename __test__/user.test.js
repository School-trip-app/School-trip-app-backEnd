"use strict";

const supertest = require("supertest");
const { app } = require("../server");
const request = supertest(app);

const random1 = Math.floor(Math.random() * 1000);

describe("Users", () => {
  it("should create a user", async () => {
    const response = await request.post("/user").send({
      username: `ww${random1}`,
      email: `ww${random1}@w.c`,
      password: "123",
      userRole: "admin",
      phonenumber: "123",
      gender: "female"
    });

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual(`ww${random1}`);
    expect(response.body.email).toEqual(`ww${random1}@w.c`);
  });

  it("should signin a user", async () => {
    const response = await request
      .post("/signin")
      .auth(`ww${random1}`, "123");

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual(`ww${random1}`);
    expect(response.body.email).toEqual(`ww${random1}@w.c`);
  });

  it("should get users info", async () => {
    const response = await request.get("/user")

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should delete a comment', async () => {
    const response = await request.delete('/user/1');
    expect(response.status).toEqual(202);
    expect(response.send).toEqual();
});

});