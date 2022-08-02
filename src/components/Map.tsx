import React,{useEffect, useRef} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screen/LoadingScreen';
import { Fab } from './Fab';


interface Props{
    markers?: typeof Marker[];
}

export const Map = ({markers}:Props) => {
  const {hasLocation, inisialPosition, getCurretLocation, follwUserLocation,userLocation, stopFollowUselocation} = useLocation();
  const mapView = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    follwUserLocation()
    return () =>{
      stopFollowUselocation();
    }
  }, [])
  
  useEffect(() => {
    if(!following.current) return;
    const {latitude, longitude} = userLocation;
      mapView.current?.animateCamera({
      center:{latitude, longitude}
    });
  }, [userLocation])
  
  
  const centerPosition = async() => {

    const {latitude, longitude} = await getCurretLocation();
    following.current=true;

    mapView.current?.animateCamera({
      center:{latitude, longitude}
    })
  }
  
  

  
    if(!hasLocation){
        return<LoadingScreen/>
    }

  return (
    <>
         <MapView
                ref={(el) => mapView.current = el!}
                style={{flex:1}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation // pone tu posicion 
                initialRegion={{
                  latitude: inisialPosition.latitude,
                  longitude: inisialPosition.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
        >
            {/* <Marker
            
                image={require('../assets/custom-marker.png')}
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="JOSUE"
                description="Hola josue estamos desde map"

            /> */}
        </MapView>
        <Fab
            iconName="compass-outline"
            onPress={centerPosition}
            style={{
                position:'absolute',
                bottom:20,
                right:20,

            }}
        />
    </>
  )
}
