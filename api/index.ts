import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createServer } from "http";
import { registerRoutes } from "../server/routes";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ready = registerRoutes(httpServer, app);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ready;
  return (app as any)(req, res);
}
