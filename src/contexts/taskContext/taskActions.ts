import { type Task } from 'react-native';
import { ADD_TASK, REMOVE_TASK, CHECK_TASK_AS_DONE, LOAD_STORAGE_TASKS } from './taskActionTypes';

interface TaskParam {
  type: string;
  payload: string | Task | Task[];
}

export const addTask = (task: Task): TaskParam => ({
  type: ADD_TASK,
  payload: task,
});

export const loadTasks = (tasks: Task[]): TaskParam => ({
  type: LOAD_STORAGE_TASKS,
  payload: tasks,
});

export const removeTask = (taskId: string): TaskParam => ({
  type: REMOVE_TASK,
  payload: taskId,
});

export const checkTaskAsDone = (taskId: string): TaskParam => ({
  type: CHECK_TASK_AS_DONE,
  payload: taskId,
});