import { Database } from "./supabase";

export type Post = Database['public']['Tables']['posts']['Row'];

export type Comment = Database['public']['Tables']['comments']['Row'];

export type Likes = Database['public']['Tables']['likes']['Row'];

export type User = Database['public']['Tables']['users']['Row'];