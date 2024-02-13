import React, { type ReactNode } from 'react';
import { TaskProvider } from './taskContext';

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider = ({ children }: GlobalContextProviderProps): React.JSX.Element => {
  return (
    // <AuthProvider>
    <TaskProvider>{children}</TaskProvider>
    // </AuthProvider>
  );
};

export default GlobalContextProvider;
