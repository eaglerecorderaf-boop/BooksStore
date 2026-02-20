
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qbtwqrjpphagocrgxjqs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_py_Si-DS5l7srcBZD7806w_vp6YZJ_T';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
