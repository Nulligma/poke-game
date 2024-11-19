import request from "supertest";
import type { App } from "supertest/types";
import { createApp } from "../src/app";

let app: App;

beforeAll(async () => {
	app = await createApp();
});

describe("GET /user", () => {
	it("responds with number of users registered", () => {});
});

let userID = "";
describe("POST /user/:id", () => {
	userID = "";
	it("responds with a validation error when an invalid user is created", () => {});
	it("responds with an inserted object when an valid user is created", () => {});
	it("responds with an duplicate error when a duplicate email is used to create user", () => {});
});

describe("GET /user/:id", () => {
	it("responds with 404 error", () => {});
	it("responds with user object", () => {});
});

describe("PATCH /user/:id", () => {
	it("responds with 404 error", () => {});
	it("responds with a validation error when an invalid user's element is patched", () => {});
	it("responds with a success message", () => {});
});

describe("DELETE /user/:id", () => {
	it("responds with a not found error when an invalid user id is used", () => {});
	it("responds with a 200 status code for valid user id", () => {});
	it("responds with a not found error for a valid user id", () => {});
});
