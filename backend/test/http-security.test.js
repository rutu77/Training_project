const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const express = require("express");
const { httpSecurityHeaders } = require("../src/middleware/httpSecurity");
const { createReadinessHandler, healthRoutes } = require("../src/routes/healthRoutes");

const app = express();
app.disable("x-powered-by");
app.use(httpSecurityHeaders);
app.use("/health", healthRoutes);
app.get("/health/ready", createReadinessHandler(async () => [{ result: 1 }]));
app.get("/health/unavailable", createReadinessHandler(async () => {
  throw new Error("database unavailable");
}));

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

test("health endpoint returns a minimal startup status", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("readiness endpoint reports database availability", async () => {
  const response = await fetch(`${baseUrl}/health/ready`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ready" });
});

test("readiness endpoint returns 503 when database check fails", async () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await fetch(`${baseUrl}/health/unavailable`);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { status: "not_ready" });
  } finally {
    console.error = originalError;
  }
});

test("HTTP responses include baseline security headers", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.equal(response.headers.get("cross-origin-resource-policy"), "cross-origin");
});
