import { type Task } from 'react-native';
import { ADD_TASK, EDIT_TASK, REMOVE_TASK, CHECK_TASK_AS_DONE, LOAD_STORAGE_TASKS } from './taskActionTypes';

interface TaskParam {
  type: string;
  payload: string | Task;
}

export const addTask = (task): TaskParam => ({
  type: ADD_TASK,
  payload: task,
});

export const editTask = (task): TaskParam => ({
  type: EDIT_TASK,
  payload: task,
});

export const loadTasks = (tasks): TaskParam => ({
  type: LOAD_STORAGE_TASKS,
  payload: tasks,
});

export const removeTask = (taskId): TaskParam => ({
  type: REMOVE_TASK,
  payload: taskId,
});

export const checkTaskAsDone = (taskId): TaskParam => ({
  type: CHECK_TASK_AS_DONE,
  payload: taskId,
});