import cors from "cors";
import express, { type Request, type Response } from "express";
import { env } from "./config/env";
import { contentRouter } from "./routes/content.routes";
import { supabaseRouter } from "./routes/supabase.routes";

export const app = express();

app.use(
  cors({
    origin: env.clientUrls,
    credentials: true
  })
);
app.use(express.json());
app.use("/api/content", contentRouter);
app.use("/api/supabase", supabaseRouter);

app.get("/", (_request: Request, response: Response) => {
  response.json({
    success: true,
    message: "VORTEX backend is running",
    health: "/api/health"
  });
});

app.get("/api/health", (_request: Request, response: Response) => {
  response.json({
    success: true,
    message: "VORTEX backend is running"
  });
});

app.use((_request: Request, response: Response) => {
  response.status(404).json({
    success: false,
    message: "Route not found"
  });
});
