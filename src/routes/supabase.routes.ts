import { Router, type Request, type Response } from "express";
import { verifySupabaseConnection } from "../services/supabase.service";

export const supabaseRouter = Router();

supabaseRouter.get("/verify", async (_request: Request, response: Response) => {
  try {
    const verification = await verifySupabaseConnection();

    response.json({
      success: true,
      data: verification
    });
  } catch {
    response.status(503).json({
      success: false,
      message: "Supabase is unavailable"
    });
  }
});
