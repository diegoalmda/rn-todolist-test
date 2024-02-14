import React, { useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useTaskContext } from '../contexts/taskContext';

export function Routes(): React.JSX.Element {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const { setStorageKey } = useTaskContext();

  useLayoutEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setStorageKey(_user?.uid);
      setUser(_user);
    });

    return unsubscribe;
  }, []);

  return <NavigationContainer>{user != null ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
