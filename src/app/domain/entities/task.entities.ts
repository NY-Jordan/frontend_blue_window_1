export interface ITask {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  status_id: number;
}

export interface IPagination {
  limit: number;
  page: number;
  totalPages: number;
  totalTasks: number;
}
