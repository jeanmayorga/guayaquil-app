import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://amsjunwtalmacvrzwmvz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtc2p1bnd0YWxtYWN2cnp3bXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5NTQyOTAsImV4cCI6MjA0MDUzMDI5MH0.XXdjp1xFHHXXIqBkAFvxnJgKbfM1yuJMUX816GbmWKA"
);
