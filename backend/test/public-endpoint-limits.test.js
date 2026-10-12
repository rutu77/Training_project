const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const express = require("express");
const {
  loginRateLimit,
  registrationRateLimit,
} = require("../src/middleware/rateLimits");

const app = express();
app.post("/login", loginRateLimit, (_req, res) => res.sendStatus(200));
app.post("/register", registrationRateLimit, (_req, res) => res.sendStatus(200));

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

async function assertLimit(path, allowedRequests) {
  for (let attempt = 0; attempt < allowedRequests; attempt += 1) {
    const response = await fetch(`${baseUrl}${path}`, { method: "POST" });
    assert.equal(response.status, 200);
  }

  const limitedResponse = await fetch(`${baseUrl}${path}`, { method: "POST" });
  assert.equal(limitedResponse.status, 429);
  assert.match(limitedResponse.headers.get("ratelimit-limit"), /^\d+$/);
  const body = await limitedResponse.json();
  assert.equal(body.status, "error");
}

test("login endpoint limits repeated attempts", async () => {
  await assertLimit("/login", 10);
});

test("registration endpoint limits repeated attempts", async () => {
  await assertLimit("/register", 5);
});
