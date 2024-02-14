import React, { type ReactNode } from 'react';
import { TaskProvider } from './taskContext';

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider = ({ children }: GlobalContextProviderProps): React.JSX.Element => {
  return <TaskProvider>{children}</TaskProvider>;
};

export default GlobalContextProvider;
