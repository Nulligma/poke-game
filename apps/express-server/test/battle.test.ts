import request from "supertest";
import type { App } from "supertest/types";
import { createApp } from "../src/app";
import { Database } from "../src/db/db";
import type { Collection } from "mongodb";
import type { Battle } from "../src/model/battle.model";

let app: App;

beforeAll(async () => {
	app = await createApp();
	const battle = (await Database.Instance.getCollection("battle")) as
		| Collection<Battle>
		| undefined;

	if (!battle) throw new Error("Cannot find battle collection");

	battle.insertMany([
		{
			userId: "1234",
			goldSpent: 300,
			goldEarned: 600,
			encounters: [{ pokemonId: 1, attempts: 1, result: "caught" }],
			createdAt: new Date(2020, 3, 12, 15, 18),
		},
		{
			userId: "1234",
			goldSpent: 300,
			goldEarned: 300,
			encounters: [{ pokemonId: 2, attempts: 3, result: "caught" }],
			createdAt: new Date(2021, 3, 12, 15, 18),
		},
		{
			userId: "1234",
			goldSpent: 300,
			goldEarned: 100,
			encounters: [{ pokemonId: 3, attempts: 8, result: "caught" }],
			createdAt: new Date(2022, 3, 12, 15, 18),
		},
		{
			userId: "1234",
			goldSpent: 300,
			goldEarned: 600,
			encounters: [{ pokemonId: 4, attempts: 1, result: "caught" }],
			createdAt: new Date(2023, 3, 12, 15, 18),
		},
	]);
});

afterAll(async () => {
	const battle = await Database.Instance.getCollection("battle");
	if (battle) await battle.deleteMany({});
	await Database.Instance.disconnect();
});

describe("GET /battle - battle endpoint should exists and it should return empty array", () => {
	it("responds with an array of battles", async () =>
		request(app)
			.get("/battle")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(4);
			}));
});

let id = "";
describe("POST /battle", () => {
	it("responds with a validation error when an invalid battle is posted", async () =>
		request(app)
			.post("/battle")
			.set("Accept", "application/json")
			.send({
				content: "",
			})
			.expect("Content-Type", /json/)
			.expect(422)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(5);
			}));

	it("responds with an inserted object when an valid battle is posted", async () =>
		request(app)
			.post("/battle")
			.set("Accept", "application/json")
			.send({
				userId: "user1234",
				goldSpent: 300,
				goldEarned: 600,
				encounters: [{ pokemonId: 5, attempts: 1, result: "caught" }],
			})
			.expect("Content-Type", /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toHaveProperty("_id");
				expect(response.body).toHaveProperty("userId");
				expect(response.body.userId).toBe("user1234");
				id = response.body._id;
			}));
});

describe("GET /battle/:id", () => {
	it("responds with a not found error when an invalid battle id is used", (done) => {
		request(app)
			.get("/battle/invalid-id")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});

	it("responds with a single battle", async () =>
		request(app)
			.get(`/battle/${id}`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("_id");
				expect(response.body).toHaveProperty("userId");
				expect(response.body.userId).toBe("user1234");
			}));
});

describe("PATCH /battle/:id", () => {
	it("responds with a not found error when an invalid battle id is used", (done) => {
		request(app)
			.patch("/battle/invalid-id")
			.set("Accept", "application/json")
			.set("Accept", "application/json")
			.send({
				userId: "testID2",
			})
			.expect(404, done);
	});

	it("responds with a validation error when an invalid battle's element is patched", async () =>
		request(app)
			.patch(`/battle/${id}`)
			.set("Accept", "application/json")
			.send({
				userId: 123,
			})
			.expect("Content-Type", /json/)
			.expect(422)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(1);
			}));

	it("responds with a success message", async () =>
		request(app)
			.patch(`/battle/${id}`)
			.set("Accept", "application/json")
			.send({
				userId: "testId2",
			})
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("message");
				expect(response.body.message).toBe("updated successfully");
			}));
});

describe("GET /battle?queryList", () => {
	it("returns list of battles posted by an userID", async () =>
		request(app)
			.get("/battle?userId=1234")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(4);
			}));
	it("returns list of battles from date range", async () =>
		request(app)
			.get("/battle?startCreatedAt=2024-01-12&endCreatedAt=2020-12-02")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(5);
			}));
	it("returns list of battles limited by number of results", async () =>
		request(app)
			.get("/battle?limit=2")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(2);
			}));
	it("returns list of updated/created last month", async () =>
		request(app)
			.get("/battle?q=last-month")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(1);
			}));
	it("returns list of battles in a date range in descending order limited by 3 results", async () => {});
});

describe("DELETE /battle/:id", () => {
	it("responds with a not found error when an invalid battle id is used", (done) => {
		request(app)
			.delete("/battle/invalid-id")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});

	it("responds with a 200 status code for valid battle id", (done) => {
		request(app).delete(`/battle/${id}`).expect(200, done);
	});

	it("responds with a not found error for a valid battle id", (done) => {
		request(app)
			.delete(`/battle/${id}`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});
});
