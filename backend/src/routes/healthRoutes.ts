import { RequestHandler, Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export function createReadinessHandler(
  checkDatabase: () => Promise<unknown>
): RequestHandler {
  return async (_req, res) => {
    try {
      await checkDatabase();
      res.status(200).json({ status: "ready" });
    } catch (error) {
      console.error("Readiness check failed:", error);
      res.status(503).json({ status: "not_ready" });
    }
  };
}

export { router as healthRoutes };
