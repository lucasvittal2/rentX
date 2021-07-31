

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
  
} from '@expo-google-fonts/archivo';
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components';
import theme from './src/styles/theme';
import { CarDetails } from './src/screens/CarDetails';
import { Schedule } from './src/screens/Schedule';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import { Routes } from './src/routes';
import { AppProvider } from './src/hook'

export default function App() {
  const [fonstLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });
  if(!fonstLoaded){
    return (
      
        <AppLoading/>
      
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes/>
      </AppProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
