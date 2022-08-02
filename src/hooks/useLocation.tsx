import {useEffect, useState,useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Locaction } from '../interface/appInterface';



export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [inisialPosition, setInisialPosition] = useState<Locaction>({
        latitude:0,
        longitude:0
    });

    const [userLocation, setUserLocation] = useState<Locaction>({
      latitude:0,
      longitude:0
    })

    const watchId = useRef();
    useEffect(() => {

        getCurretLocation()
          .then(locaction => {
              setInisialPosition(locaction);
              setUserLocation(locaction)
              setHasLocation(true);
          });
    }, [])
    
    const getCurretLocation = ():Promise<Locaction> =>{
      return new Promise((relsove, reject)=> {
        Geolocation.getCurrentPosition(
          ({coords})=>{
               relsove({
                   latitude:coords.latitude,
                   longitude: coords.longitude,
               });

               setHasLocation(true);
          },
       
           
           (err) => console.log({err}),{ enableHighAccuracy:true}
       );
        
      })

      
    }

   const follwUserLocation = () => {
    
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        console.log({coords})
          setUserLocation({
            latitude: coords.latitude,
            longitude: coords.longitude
          })
      },
      (err) => console.log(err), {enableHighAccuracy: true, distanceFilter:10}
    )
   }

   const stopFollowUselocation = () => {
    if (watchId.current){
      Geolocation.clearWatch(watchId.current);

    }
   }

  return{
    hasLocation,
    inisialPosition,
    getCurretLocation,
    follwUserLocation,
    userLocation,
    stopFollowUselocation
  }
}
