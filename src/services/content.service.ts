import { supabase } from "../config/supabase";

const contentTables = [
  "destinations",
  "experiences",
  "reels",
  "artisans",
  "crafts"
] as const;

type ContentTable = (typeof contentTables)[number];

async function readTable(table: ContentTable): Promise<Record<string, unknown>[]> {
  const { data, error } = await supabase.from(table).select("*");

  if (error) {
    throw new Error(`Supabase query failed for ${table}`);
  }

  return (data ?? []) as Record<string, unknown>[];
}

export async function readTourismContent(): Promise<
  Record<ContentTable, Record<string, unknown>[]>
> {
  const entries = await Promise.all(
    contentTables.map(async (table) => [table, await readTable(table)] as const)
  );

  return Object.fromEntries(entries) as Record<ContentTable, Record<string, unknown>[]>;
}