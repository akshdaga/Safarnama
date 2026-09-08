import { supabase } from "../config/supabase";

const countTables = [
  "destinations",
  "experiences",
  "reels",
  "artisans",
  "crafts",
  "discovery_metrics"
] as const;

type TableName = (typeof countTables)[number];

type TableCount = Record<TableName, number>;

async function countTable(table: TableName): Promise<number> {
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true });

  if (error) {
    throw new Error(`Supabase query failed for ${table}`);
  }

  return count ?? 0;
}

export async function verifySupabaseConnection(): Promise<{
  sampleDestination: Record<string, unknown> | null;
  counts: TableCount;
}> {
  const { data: sampleDestination, error: sampleError } = await supabase
    .from("destinations")
    .select("id, name")
    .limit(1)
    .maybeSingle();

  if (sampleError) {
    throw new Error("Supabase destination query failed");
  }

  const entries = await Promise.all(
    countTables.map(async (table) => [table, await countTable(table)] as const)
  );

  return {
    sampleDestination,
    counts: Object.fromEntries(entries) as TableCount
  };
}
