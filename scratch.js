import { supabase } from "./src/services/supabase";

async function run() {
  const { data, error } = await supabase.from("Users").select("*").limit(1);
  if (error) console.error("Error:", error);
  else console.log("Data:", data);
}

run();
