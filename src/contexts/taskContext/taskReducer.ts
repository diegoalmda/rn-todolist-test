import { type Task } from './taskType';
import { ADD_TASK, REMOVE_TASK, CHECK_TASK_AS_DONE, LOAD_STORAGE_TASKS } from './taskActionTypes';

const taskReducer = (state, action): Task[] => {
  switch (action.type) {
    case ADD_TASK:
      console.log('Action Dispatched:', action.payload);
      return [...state, action.payload];    
    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case CHECK_TASK_AS_DONE:
      return state.map((task) => {     
        return task.id === action.payload ? { ...task, done: !task.done } : task;
      });
    case LOAD_STORAGE_TASKS:
      return  action.payload;
    default:
      return state;
  }
};

export default taskReducer;