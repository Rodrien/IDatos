import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native'
import Event from '../models/Event'
import { EventsContext } from '../contexts/EventsContext'
import { GradientButton } from './GradientButton'
import { Ionicons } from '@expo/vector-icons'
import {useNavigate} from 'react-router-native'
import MapView, { Marker } from 'react-native-maps'
import { getDay, getMonth } from '../helpers/utils'

export const EventDetail = () => {

    const { selectedEvent } = useContext(EventsContext)
  

    const openEventPage =  async (url: string) => {
        if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url);
        }
    }

    return (
        selectedEvent &&
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{uri: selectedEvent.urlImage}} />
            <View>
                <Text style={styles.title}>
                    {selectedEvent.name}
                </Text>
                <Text style={styles.description}>
                    {selectedEvent.description.length > 300 ? selectedEvent.description.substring(0,300) + "..." : selectedEvent.description}
                </Text>
            </View>
            {selectedEvent.dates && selectedEvent.dates.length > 0 && (!Number.isNaN(getDay(selectedEvent.dates[0]))) && 
            <View style={{flex:0}}>
                <Text style={styles.datesText}>Fechas:</Text>
                <ScrollView horizontal>
                    {selectedEvent.dates.map(date => {
                        const dateText = (getDay(date) + 1) + "/" + (date.getMonth()+1)
                        return (
                            <GradientButton key={date.getDate()} onPressFunc={() => {}} active text={dateText}/>
                        )
                    })}
                </ScrollView>
            </View>
            }
            {
                selectedEvent.latitude && selectedEvent.longitude && 
                <MapView
                customMapStyle={customMapStyle}
                style={styles.map}
                showsUserLocation = {true}
                region={{
                    latitude: selectedEvent.latitude,
                    longitude: selectedEvent.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                    <Marker key={selectedEvent.name} coordinate={{
                    latitude: selectedEvent.latitude,
                    longitude: selectedEvent.longitude,
                  }}/>
                </MapView>
            }
            <View style={styles.button}>
                <GradientButton active text='Ver en la Web' onPressFunc={() => openEventPage(selectedEvent.eventUrl)}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex:1,
    },

    title: {
        color:'white',
        fontSize:30,
        fontWeight:900,
        top: -30,
        textAlign: 'center',
        
    },

    map: {
        height:'20%',
        margin: 15,
        borderRadius: 10,
        marginTop:30,
    },

    description: {
        textAlign:'left',
        color:'white',
        fontSize: 12,
        marginBottom: 20,
        maxWidth:'90%',
        margin: 'auto'
    },

    button: {
        flex:1,
        zIndex:4,
        marginHorizontal: 'auto',
        alignItems:'center',
        paddingTop: 20,
        justifyContent:'center',
        marginBottom: 350,
        marginTop: 10,
    },

    image: {
        margin:0,
        padding:0,
        maxWidth:'100%',
        height:300,
        objectFit: 'contain',
    },

    datesText: {
        color:'white',
        marginTop:20,
        marginLeft: 15,
        marginBottom: 15,
    },

    goBackButton: {
        position:'absolute',
        top:50,
        left:30,
        backgroundColor: 'black',
        padding:0,
        margin:0,
        borderRadius: 2000,
        zIndex: 3
    },
})


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