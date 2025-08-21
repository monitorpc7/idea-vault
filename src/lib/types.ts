export type Idea = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date; // Keep as Date object for client-side consistency
  created_at?: string; // Raw value from Supabase
};
