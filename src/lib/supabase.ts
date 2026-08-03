import { createClient } from '@supabase/supabase-js';

// WARNING: Client-side usage of the Supabase Anon Key.
// Supabase is designed for this as long as Row Level Security (RLS) is properly configured in your database.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zhuzionkjbdpdczugaom.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpodXppb25ramJkcGRjenVnYW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NDQ4OTEsImV4cCI6MjEwMTMyMDg5MX0.UUGSlp6yMC42smBYyxvFHV4BneGYSicmT-fUioFtSMI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
