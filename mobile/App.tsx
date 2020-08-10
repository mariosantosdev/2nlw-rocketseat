import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

import StackRoute from './src/routes/stack'

export default function App() {
  let [fonstLoad] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fonstLoad) {
    return <AppLoading />
  } else {
    return (
      <>
        <StackRoute />
        <StatusBar style="light" />
      </>
    );
  }
}
