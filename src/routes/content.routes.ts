import { Router, type Request, type Response } from "express";
import { readTourismContent } from "../services/content.service";

export const contentRouter = Router();

contentRouter.get("/", async (_request: Request, response: Response) => {
  try {
    response.json({
      success: true,
      data: await readTourismContent()
    });
  } catch {
    response.status(503).json({
      success: false,
      message: "Tourism content is unavailable"
    });
  }
});