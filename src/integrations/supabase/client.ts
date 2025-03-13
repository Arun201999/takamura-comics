
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iplhllnpadnqymqfloqw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwbGhsbG5wYWRucXltcWZsb3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MzM4NDgsImV4cCI6MjA1NzQwOTg0OH0.yPO-SBawBWgWzHv-b67yD226XOkVvYqagJWaM0F78Eo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
