import { Hono } from "hono";
import { logger } from "hono/logger";
import { f } from "./routes/f";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/f", f);

export default app;
export type ApiRoutes = typeof apiRoutes;
