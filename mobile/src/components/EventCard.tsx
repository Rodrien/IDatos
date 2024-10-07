import React, { useContext } from 'react'
import Event from '../models/Event'
import { ImageBackground, View, Text, StyleSheet } from 'react-native'
import { computeDistance, getDay, getMonth } from '../helpers/utils'
import { LocationContext } from '../contexts/LocationContext'
import { GradientButton } from './GradientButton'
import * as theme from '../../theme.json'
import { EventsContext } from '../contexts/EventsContext'
import { useNavigate } from 'react-router-native'
import { Background } from './Background';

interface IEventCardProps {
    event: Event,
    isLastItem: boolean,
}
export const EventCard = ({ event, isLastItem = false}: IEventCardProps) => {

    const { setSelectedEvent } = useContext(EventsContext)
    const { location } = useContext(LocationContext);

    let navigate = useNavigate();


    const goToEventPage = (event:Event) => {
        setSelectedEvent(event)
        navigate('/eventDetail')
    }

    const getDistance = (event:Event) => {
        if (event.latitude && event.longitude && location?.latitude && location?.longitude) {
            const distanceInKM = computeDistance(location.latitude, location.longitude, event.latitude, event.longitude);
            if (distanceInKM >= 1) {
                return distanceInKM.toFixed(1) + " KM"
            }
            else {
                return (distanceInKM*1000).toFixed(0) + " Metros" 
            }
        }
        else {
            return "Distancia desconocida"
        }
    }

    return (
        <View style={isLastItem ? [styles.card, styles.lastCard] : styles.card} key={event.name}>
            <ImageBackground style={styles.image} source={{ uri: event.urlImage }}>
                <View style={styles.overlay}>
                    <View style={styles.data}>
                        <View style={styles.titleAndDistanceContainer}>
                            <Text style={styles.title}>
                                {event.name}
                            </Text>
                            {
                                location?.latitude && location?.longitude &&
                                event.latitude && event.longitude &&
                                <Text style={styles.distance}>A {getDistance(event)}</Text>
                            }
                        </View>
                        {
                            event.dates && event.dates.length > 0 && !Number.isNaN(getDay(event.dates[0])) &&
                            <View style={styles.date}>
                                <View>
                                    <Text style={styles.dayOfDate}>
                                        {getDay(event.dates[0]) + 1}
                                    </Text>
                                    <Text style={styles.monthOfDate}>
                                        {getMonth(event.dates[0])}
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ImageBackground>
            {
                (event.eventUrl.includes('redtickets') || event.eventUrl.includes('tickantel'))  &&
                <View style={styles.ticketera}>
                    <Text style={styles.ticketeraText}>
                        {event.eventUrl.includes('redtickets') ? 'RedTickets' : 'Tickantel'}
                    </Text>
                </View>
            }
            <View style={styles.buttonContainer}>
                <GradientButton text={"Ver Evento"} active onPressFunc={() => goToEventPage(event)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(1,1,1,0.75)',
        minHeight: 180,
        maxHeight: 180,
    },

    date: {
        width: 60,
        height: 60,
        opacity: 1,
        backgroundColor: 'rgba(1,0,0,.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'absolute',
        right: 20,
        top: 10,
    },

    card: {
        marginVertical: 5,
        width: '100%',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },

    data: {
        position: 'relative',
        padding: 10,
        marginTop: 10,
    },

    titleAndDistanceContainer: {
        position: 'absolute',
        top: 3,
        left: 20,
        maxWidth: '70%',
    }, 

    ticketera: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        borderRadius:10,
        overflow:'hidden',
        margin:0,
        padding:7,
        backgroundColor: 'rgb(1,1,1)'
    },

    ticketeraText: {
        color:'white',
        fontSize:12,
    },

    title: {
        color: 'white',
        fontSize: 20,
        fontFamily: "monospace",
        fontWeight: "500",
        paddingTop: 10
    },

    image: {
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        width: '100%',
        overflow: 'hidden',

    },

    buttonContainer: {
        position: 'absolute',
        bottom: -2,
        right: -22,
        backgroundColor: theme.backgroundColor,
        padding: 3,
        borderRadius: 100,
        overflow: 'visible',
    },


    button: {
        backgroundColor: '#FF4E00',
        borderRadius: 100,
        color: 'white',
        padding: 15
    },

    buttonText: {
        color: 'white',
        fontWeight: '700'
    },

    dayOfDate: {
        color: 'white',
        opacity: 1,
        justifyContent:'center',
        fontSize: 24,
        fontWeight: "bold",
    },

    monthOfDate: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: "900",
        fontSize: 10,
        fontFamily: 'arial',
    },

    lastCard: {
        marginBottom: '10%',
    },

    distance: {
        top: 5,
        color: 'white',
        fontSize: 13

    }
})
