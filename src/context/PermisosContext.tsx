import React,{ createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export interface PermissionState{
    locationStatus: PermissionStatus
}


export const permissionsInitState: PermissionState ={
    locationStatus:'unavailable',
}

type PermissionContextProps = {
    permissions: PermissionState;
    askLocationPermissions: () => void;
    checkLocationPermissions: () => void;
}

export const PermissionContext = createContext({} as PermissionContextProps  );


export const PermissionsProvider = ({children}: any) =>{

    const [permissions, setPermissions] = useState(permissionsInitState)
    useEffect(() => {
        
       checkLocationPermissions();
       
       AppState.addEventListener('change', state => {
        if(state !== 'active') return

        checkLocationPermissions();
      })
    
      
    }, []);
    
    //console.log(children);
    const askLocationPermissions = async() => {

        let permissionStatus: PermissionStatus;
        
        if(Platform.OS === 'ios' ){
        // permissionStatus =  await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        permissionStatus =  await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
        // permissionStatus =  await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        permissionStatus =  await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        
         if(permissionStatus === 'blocked' ){
            openSettings();
         }

         setPermissions({
          ...permissions,
         locationStatus:permissionStatus
         })
  }

    

    const checkLocationPermissions = async() => {

        let permissionStatus: PermissionStatus;
        
        if(Platform.OS === 'ios' ){
        // permissionStatus =  await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        permissionStatus =  await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
        // permissionStatus =  await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        permissionStatus =  await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        setPermissions({
            ...permissions,
            locationStatus:permissionStatus
        })
    }


    

    return (
        <PermissionContext.Provider value={{
            permissions,
            askLocationPermissions,
            checkLocationPermissions
        }}>
            {children}
        </PermissionContext.Provider>
    )
}