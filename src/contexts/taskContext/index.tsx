// React imports
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useLayoutEffect,
} from 'react';

// External libs imports
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers and actions imports
import taskReducer from './taskReducer';
import { type Task } from './taskType';
import { addTask, checkTaskAsDone, loadTasks, removeTask } from './taskActions';

interface TaskProviderProps {
  children: ReactNode;
}

interface ITaskContextData {
  tasks: Task[];
  isLoadingTasks: boolean;
  addNewTask: (taskTitle: Task['title']) => void;
  toggleTaskDone: (taskId: Task['id']) => void;
  removeTaskById: (taskId: Task['id']) => void;
  setStorageKey: (id: string) => void;
}

const TaskContext = createContext({} as ITaskContextData);

function TaskProvider({ children }: TaskProviderProps): React.JSX.Element {
  const [taskState, dispatch] = useReducer(taskReducer, []);

  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
  const [userStorageKey, setUserStorageKey] = useState<string>('');

  async function addNewTask(taskTitle: Task['title']): Promise<void> {
    const timestamp = Date.now().toString(16);
    const randomId = timestamp + '-' + Math.floor(Math.random() * 1000000).toString(16);

    const newTask: Task = {
      id: randomId,
      title: taskTitle,
      done: false,
      user: userStorageKey,
    };
    dispatch(addTask(newTask));
  }

  function toggleTaskDone(taskId: Task['id']): void {
    dispatch(checkTaskAsDone(taskId));
  }

  function removeTaskById(taskId: Task['id']): void {
    dispatch(removeTask(taskId));
  }

  function setStorageKey(userUid: string): void {
    if (userUid !== '' && userUid !== undefined && userUid !== null) {
      setUserStorageKey(`@todolist-test-1.0.0:${userUid}`);
    }
  }

  useLayoutEffect(() => {
    async function loadTasksData(): Promise<void> {
      try {
        setIsLoadingTasks(true);
        const tasksStored = await AsyncStorage.getItem(userStorageKey);

        if (tasksStored) {
          const tasksFound = JSON.parse(tasksStored) as Task[];
          const tasksByUser: Task[] = tasksFound.filter((task) => task.user === userStorageKey);

          dispatch(loadTasks(tasksByUser));
        } else {
          dispatch(loadTasks([]));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingTasks(false);
      }
    }

    if (userStorageKey !== '') {
      loadTasksData();
    }
  }, [userStorageKey]);

  useEffect(() => {
    async function updateTasksInStorage(): Promise<void> {
      try {
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(taskState));
      } catch (err) {
        console.log(err);
      }
    }

    updateTasksInStorage();
  }, [taskState]);

  return (
    <TaskContext.Provider
      value={{
        tasks: taskState,
        addNewTask,
        toggleTaskDone,
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
