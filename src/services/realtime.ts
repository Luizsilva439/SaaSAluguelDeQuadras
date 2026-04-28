import { supabase } from "./supabase";

type TableSubscription = {
  table: string;
  filter?: string;
  schema?: string;
};

export function subscribeToTables(
  subscriptions: TableSubscription[],
  onChange: () => void
) {
  const channel = supabase.channel(`sync-${Date.now()}-${Math.random()}`);

  subscriptions.forEach((item) => {
    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: item.schema || "public",
        table: item.table,
        filter: item.filter,
      },
      () => {
        onChange();
      }
    );
  });

  channel.subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
