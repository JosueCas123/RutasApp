import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScrenn, MapScreen } from '../screen/MapScrenn';
import { PermisosScreen } from '../screen/PermisosScreen';
import { PermissionContext } from '../context/PermisosContext';
import { LoadingScreen } from '../screen/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = ()  => {

 const {permissions}  = useContext(PermissionContext);
 if ( permissions.locationStatus === "unavailable" ){
  return <LoadingScreen/>
 }

  return (
    <Stack.Navigator
   // initialRouteName="PermisosScreen"
        screenOptions={{
            headerShown:false,
            cardStyle:{
                backgroundColor:'white'
            }
        }}
    >
      {
        (permissions.locationStatus === 'granted')
          ?<Stack.Screen name="MapScreen" component={MapScreen} />
          :<Stack.Screen name="PermisosScreen" component={PermisosScreen} />
      }
      
      
 
    </Stack.Navigator>
  );
}