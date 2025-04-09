// store/reducers/task.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { IPagination, ITask } from '../../domain/entities/task.entities';

export interface TaskState {
  tasks: ITask[];
  pagination : null | IPagination
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  pagination : null,
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { tasks, pagination }) => ({
    ...state,
    loading: false,
    tasks,
    pagination

  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [task, ...state.tasks]
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  }))
);
