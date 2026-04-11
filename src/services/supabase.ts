import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://ksrchiavtefbgsfkyeqw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzcmNoaWF2dGVmYmdzZmt5ZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzgwNTQsImV4cCI6MjA5MTQ1NDA1NH0.Exik1ZB1gBYNYxhYZ6vJaxVF-iwk6czW8q9MJk8NIWQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});