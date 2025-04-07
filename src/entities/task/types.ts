export type TaskStatus = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at?: string;
  authorId: string;
  updated_at?: Date;
}

export interface Tasks {
  items: Task[];
  total?: number;
}
