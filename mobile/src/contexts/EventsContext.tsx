import React, { Context, createContext, useContext, useEffect, useState } from 'react'
import { getEvents } from '../services/eventsService';
import Event from '../models/Event'
import { FiltersContext } from './FiltersContext';
import { computeDistance } from '../helpers/utils';
import { LocationContext } from './LocationContext';

type ContextProps = {
    nearEvents: Event[],
    events: Event[],
    searchedEvents: Event[],
    selectedEvent: Event | null,
    setSelectedEvent: any
  };

export const EventsContext: Context<ContextProps> = createContext<ContextProps>({
    nearEvents:[],
    events: [],
    searchedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {}
});

export const EventsProvider = (props: any) => {

    const {activeCategory, categories, searchText} = useContext(FiltersContext);
    const {location} = useContext(LocationContext);

    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [nearEvents, setNearEvents] = useState<Event[]>([])
    const [events, setEvents] = useState<Event[]>([]);
    const [searchedEvents, setSearchedEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    // Update location by current location on mount
    useEffect(() => {
        const fetchData = async () => {
            let events = await getEvents();
            events = events.filter(e => !e.name.includes("TMC"));
            setAllEvents(events);
        }
        fetchData()
    }, []);

    useEffect(() => {
        let events = allEvents;
        if (activeCategory.toLowerCase() != categories[0].toLowerCase()) {
            events = events.filter(e => e.categories.includes(activeCategory));
        }
        events = events.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setEvents(events)

        //For near you screen
        let comingEvents = events.filter(e => e.latitude && e.longitude)
        comingEvents = comingEvents.sort((a,b) => {
            if (a.latitude && a.longitude && b.latitude && b.longitude &&location?.latitude && location.longitude)
                return computeDistance(a.latitude, a.longitude, location?.latitude, location?.longitude) - computeDistance(b.latitude, b.longitude, location?.latitude, location?.longitude)
            return -1000
        })
        comingEvents = comingEvents.slice(0, 20)
        setNearEvents(comingEvents);

        //For filters page
        let filteredEvents = events;
        if (searchText && searchText != "") {
            filteredEvents = filteredEvents.filter(e => e.name.toLowerCase().includes(searchText.toLowerCase()))
        }
        setSearchedEvents(filteredEvents);
        
    },[allEvents, activeCategory, searchText])
  
    return (
      <EventsContext.Provider
        value={{
          events,
          nearEvents,
          searchedEvents,
          selectedEvent,
          setSelectedEvent
        }}
      >
        {props.children}
      </EventsContext.Provider>
    );
  };

