import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if variables are present to avoid runtime errors during development if not set up
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
}

// Create and export the Supabase client
// We use the non-null assertion or fallback to empty string to satisfy TS, 
// but the warning above handles the DX.
export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
