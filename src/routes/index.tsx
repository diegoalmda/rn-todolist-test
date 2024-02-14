import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

// import { useAuth } from '../contexts/authContext';
// import { useTaskContext } from "../contexts/taskContext";
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useTaskContext } from "../contexts/taskContext";

export function Routes() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  
  const { setUserIdCode } = useTaskContext();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(_user => {
      setUser(_user);
      setUserIdCode(_user?.uid);
      if (initializing) setInitializing(false);
    })
    return unsubscribe;
  }, []);

  return(
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}