import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xzdmxpqryvhgbvhsysoj.supabase.co";
export const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6ZG14cHFyeXZoZ2J2aHN5c29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2MjA4NTUsImV4cCI6MjEwNDE5Njg1NX0.DwOfLncnhmlmsyh-4EA_JB2un8BE0B_XfZOCrg5amjw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
