import { Hono } from "hono";
import { logger } from "hono/logger";
import { f } from "./routes/f";
import { serveStatic } from "hono/bun";
import os from "os";

const app = new Hono();

app.use("*", async (c, next) => {
  // Add server hostname/IP to the response
  c.res.headers.set("X-Handled-By", os.hostname());
  await next();
});
app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/f", f);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
