import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { MapScreen } from './src/screen/MapScrenn';
import { PermissionsProvider } from './src/context/PermisosContext';
import { enableLatestRenderer } from 'react-native-maps';

enableLatestRenderer();

const AppState = ({children}:any) => {

  return(
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}


const App = () => {
  return (
    <NavigationContainer  >
      <AppState>
        <Navigator/>
      </AppState>
      {/* <MapScreen/> */}
    </NavigationContainer>
  )
}
export default App;