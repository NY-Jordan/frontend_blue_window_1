import { IPagination, ITask } from "../domain/entities/task.entities";

export interface TaskState {
  tasks: ITask[];
  pagination : IPagination,
  loading: boolean;
  error: string | null;
}

export interface AppState {
  task: TaskState;
}
