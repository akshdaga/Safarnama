import dotenv from "dotenv";

dotenv.config();

function readRequired(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function readPort(value: string | undefined): number {
  if (!value) {
    return 4000;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
}

export const env = {
  port: readPort(process.env.PORT),
  clientUrls: (process.env.CLIENT_URL ?? "http://localhost:3000,http://localhost:4173,https://safarnama-theta.vercel.app,https://safarnama-platform-3.vercel.app")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  aiApiKey: process.env.AI_API_KEY ?? "",
  supabaseUrl: readRequired("SUPABASE_URL"),
  supabasePublishableKey: readRequired("SUPABASE_PUBLISHABLE_KEY")
};
