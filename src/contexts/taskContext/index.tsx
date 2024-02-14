import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import taskReducer from './taskReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Task } from './taskType';
import { addTask, checkTaskAsDone, editTask, loadTasks, removeTask } from './taskActions';

interface TaskProviderProps {
  children: ReactNode;
}

interface ITaskContextData {
  tasks: Task[];
  isLoadingTasks: boolean;
  addNewTask: (taskTitle: Task['title']) => void;
  toggleTaskDone: (taskId: Task['id']) => void;
  editTaskTitle: (taskd: Task) => void;
  removeTaskById: (taskId: Task['id']) => void;
  setStorageKey: (id: string) => void;
}

// const tasksStorageKey = '@todolist-test-1.0.0:tasks';

const TaskContext = createContext({} as ITaskContextData);

function TaskProvider({ children }: TaskProviderProps): React.JSX.Element {
  // const tasks = await AsyncStorage.getItem(tasksStorageKey);
  const [taskState, dispatch] = useReducer(taskReducer, []);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
  // const [userId, setUserId] = useState<string>('');
  const [userStorageKey, setUserStorageKey] = useState<string>('');

  async function addNewTask(taskTitle: Task['title']): Promise<void> {
    const timestamp = Date.now().toString(16);
    const randomId = timestamp + '-' + Math.floor(Math.random() * 1000000).toString(16);

    const newTask = {
      id: randomId,
      title: taskTitle,
      done: false,
      user: userStorageKey
    };
    dispatch(addTask(newTask));
  }

  function toggleTaskDone(taskId: Task['id']): void {
    dispatch(checkTaskAsDone(taskId));
  }

  function editTaskTitle(task: Task): void {
    dispatch(editTask(task));
  }

  function removeTaskById(taskId: Task['id']): void {
    dispatch(removeTask(taskId));
  }
  
  function setStorageKey(userUid: string): void {
    setUserStorageKey(`@todolist-test-1.0.0:${userUid}`);
  }

  useEffect(() => {
    async function loadTasksData(): Promise<void> {
      const tasksStored = await AsyncStorage.getItem(userStorageKey);

      if (tasksStored) {
        const tasksFound = JSON.parse(tasksStored) as Task[];

        console.log('Tasks encontradas:', tasksFound);

      const tasksByUser = tasksFound.filter(task => task.user === userStorageKey);

      console.log('Tasks filtradas pelo usuário:', tasksByUser);

        dispatch(loadTasks(tasksByUser));
      }
      setIsLoadingTasks(false);
    }

    try {
      loadTasksData();
    } catch (err) {
      console.log(err);
    }
  }, [userStorageKey]);

  useEffect(() => {
    async function updateTasksInStorage(): Promise<void> {
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(taskState));
    }

    try {
      updateTasksInStorage();
    } catch (err) {
      console.log(err);
    }

    // console.log(userStorageKey);
    // console.log(JSON.stringify(taskState, null, 2));
  }, [taskState]);

  return (
    <TaskContext.Provider
      value={{
        tasks: taskState,
        addNewTask,
        toggleTaskDone,
        editTaskTitle,
        removeTaskById,
        isLoadingTasks,
        setStorageKey,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTaskContext(): ITaskContextData {
  const context = useContext(TaskContext);

  return context;
}

export { TaskProvider, useTaskContext };
