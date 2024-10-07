import React, { createRef, useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { LocationContext } from '../contexts/LocationContext'
import { EventsContext } from '../contexts/EventsContext'
import Event from '../models/Event'
import { EventCard } from '../components/EventCard'
import { FiltersHeader } from '../components/FiltersHeader'

export const MapScreen = () => {
    
    const {location} = useContext(LocationContext);
    const {events} = useContext(EventsContext);

    const mapRef = createRef<MapView>();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

    useEffect(() => {
      if (selectedEvent && selectedEvent.latitude && selectedEvent.longitude && mapRef && mapRef.current) {
        mapRef.current.animateToRegion({
            latitude: selectedEvent.latitude,
            longitude: selectedEvent.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        })
      } 
    }, [selectedEvent])
    

    return (
        <>
        <View style={styles.filters}>
          <FiltersHeader showText={false}></FiltersHeader>
        </View>
          <MapView
              ref={mapRef}
              customMapStyle={customMapStyle}
              style={styles.map}
              showsUserLocation = {true}
              region={{
                latitude: location ? location.latitude : -34.89106944,
                longitude: location ? location.longitude : -56.18726111,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              showsMyLocationButton = {location != null}
              >
              {
                events.map((event: any) => {
                  const coordinates = {
                    latitude: event.latitude,
                    longitude: event.longitude,
                  };
                  return (
                    event.latitude && event.longitude && 
                    <Marker onTouchEndCapture={() => setSelectedEvent(null)} key={event.name} onPress={() => setSelectedEvent(event)} coordinate={coordinates}/>
                  )
                })
              }
          </MapView>
          {selectedEvent != null && 
          <TouchableOpacity onPressOut={() => setSelectedEvent(null)} style={{width:370, overflow:'hidden'}}>
            <TouchableOpacity style={styles.close} onPress={() => setSelectedEvent(null)}> 
              <Text>X</Text>
            </TouchableOpacity>
            <EventCard event={selectedEvent} isLastItem={false}/>
          </TouchableOpacity>
          }
        </>
        
);
}

const styles = StyleSheet.create({

filters: {
  position:'absolute',
  top:70
}, 

close: {
  top:20,
  left:20
},

viewContainer: {
position:'absolute', 
top:'8%', 
alignSelf:'center',
color: 'red',
borderRadius:100,
},

mapLogo: {
width:80,
height:80,
margin: 10,
},

mapLogoContainer: {
padding: 10,
backgroundColor: 'rgba(0,0,0,0.1)',
borderRadius:100
},

cardDataContainer: {
  padding:10,
  display:'flex',
  justifyContent: 'center',
},

container: {
...StyleSheet.absoluteFillObject,
flex: 1,
justifyContent: 'flex-end',
alignItems: 'center',
},
map: {
...StyleSheet.absoluteFillObject,
zIndex:-1,
height:'125%',
},

cardImage: {
  minWidth:'100%',
  minHeight: 100,
  overflow: 'hidden',
},

title: {
  color:'white',
  alignSelf: 'center',
},

profilePicture: {
width: '100%',
objectFit: 'cover',
minHeight: 130,
margin: 0,
padding: 0,
zIndex: 200000000
},
});

const customMapStyle = [
{
"featureType": "administrative",
"elementType": "geometry",
"stylers": [
{
  "visibility": "off"
}
]
},
{
"featureType": "poi",
"stylers": [
{
  "visibility": "off"
}
]
},
{
"featureType": "road",
"elementType": "labels.icon",
"stylers": [
{
  "visibility": "off"
}
]
},
{
"featureType": "transit",
"stylers": [
{
  "visibility": "off"
}
]
}]