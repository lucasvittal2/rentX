import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hook/auth';
import { AuthRoutes } from './auth.routes';
import { StackTabRoutes } from './app.tab.routes';
import { LoadAnimation } from '../components/LoadAnimation';
import { View } from 'react-native';

export function Routes(){
 const { user, loading } = useAuth();
 console.log(user);
 return loading && user.id?
    <View style={{marginTop: 200, marginLeft: 50}}>
      <LoadAnimation />
    </View>
    :
    <NavigationContainer>
        { user ? <StackTabRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
  ;
}