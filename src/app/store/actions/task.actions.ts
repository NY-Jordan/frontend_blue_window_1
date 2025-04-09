import { createAction, props } from '@ngrx/store';
import { IPagination, ITask } from '../../domain/entities/task.entities';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: ITask[],  pagination : IPagination  }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: string }>());

export const addTask = createAction('[Task] Add Task', props<{ task: ITask }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: ITask}>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: string }>());

export const updateTask = createAction('[Task] Update Task', props<{ task: ITask }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: ITask }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: string }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: number }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: string }>());
