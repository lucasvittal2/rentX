import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hook/auth';
import { StackAppRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';
import { StackTabRoutes } from './app.tab.routes';

export function Routes(){
 const { user } = useAuth();
 return ( 
    <NavigationContainer>
        { user.id ? <StackTabRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
  );
}