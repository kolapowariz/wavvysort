import { Database } from "./supabase";

export type Post = Database['public']['Tables']['posts']['Row'];

export type Comment = Database['public']['Tables']['comments']['Row'];