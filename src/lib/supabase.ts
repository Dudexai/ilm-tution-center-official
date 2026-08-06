import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://xkcrpygmcjiwqxyxusxg.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrY3JweWdtY2ppd3F4eXh1c3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MjI0MTgsImV4cCI6MjEwMDk5ODQxOH0.rFn1KHMII0oJ-S_MVKEzspFvN07DAj4J7XMnHrOe0VM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ReviewItem {
  id?: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  created_at?: string;
}
