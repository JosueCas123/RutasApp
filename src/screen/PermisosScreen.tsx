import React, { useContext } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionContext } from '../context/PermisosContext';

export const PermisosScreen = () => {

  const  {permissions, askLocationPermissions} = useContext(PermissionContext);


  // const checkLocationPermiso = async() => {

  //   let permissionStatus: PermissionStatus;

  //   if(Platform.OS === 'ios' ){
  //     // permissionStatus =  await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //     permissionStatus =  await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //   }else{
  //     // permissionStatus =  await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //     permissionStatus =  await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //   }

  //   console.log(permissionStatus);
  // }

  return (
    <View style={styles.container} >
        <Text style={styles.title} >Para usar la aplicacion es nesesario el permiso de GPS</Text>

      <BlackButton
        title="Permiso"
        onPress={askLocationPermissions}

      />
      <Text style={{marginTop:20}}>
        {JSON.stringify(permissions, null , 5)}
      </Text>

    </View>
  )
}


const styles = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   },
   title:{
    width:200,
    fontSize:18,
    textAlign:'center',
    marginBottom:20


   }
});