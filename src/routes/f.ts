import { Hono } from "hono";

export const f = new Hono().get("/", (c) => {
  return c.json({ message: "Hello World from f" });
});
