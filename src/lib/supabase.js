import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idnztvrdmutkrnirtvxs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlkbnp0dnJkbXV0a3JuaXJ0dnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MzUzNzQsImV4cCI6MjA0OTQxMTM3NH0.8fGP0MNr8qIzvZy1yMXGT3aG-nGCEwgJq9XrjtJxcrs';

export const supabase = createClient(supabaseUrl, supabaseKey);