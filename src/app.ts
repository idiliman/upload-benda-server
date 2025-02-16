import { Hono } from "hono";
import { logger } from "hono/logger";
import { f } from "./routes/f";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/f", f);

app.get("*", serveStatic({ path: "./src/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
