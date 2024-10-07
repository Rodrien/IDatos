import React, { useState, useEffect, useContext } from 'react'
import Event from '../models/Event'
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native'
import { GradientButton } from './GradientButton'
import * as theme from '../../theme.json'
import { computeDistance, getDay, getMonth } from '../helpers/utils'
import { LocationContext } from '../contexts/LocationContext'
import axios from 'axios';
import { EventsContext } from '../contexts/EventsContext'
import { EventCard } from './EventCard'

interface IListedEventsProps {
    events: Event[],
}
export const ListedEvents = ({ events } : IListedEventsProps) => {


    const {location} = useContext(LocationContext);

    return (
    <View>
        { events.map((event: Event, index: number) => {
            return (
               <EventCard event={event} key={event.name + event.categories[0]} isLastItem={index ==  events.length - 1}/>
            )
        })}
    </View>
    )
}
