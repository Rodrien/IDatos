import { addEvents } from '../db/database.js';
import Event from '../models/event.js';

class eventsManager {
    constructor() { }

    async addScrapedEvents(scrapedEvents) {
        let joinedEvents = joinScrapedEventsByCategory(scrapedEvents);
        let events = convertScrapedEventsToEvents(joinedEvents);

        return await addEvents(events);
    }
}

function joinScrapedEventsByCategory(scrapedEvents) {
    const urlMap = new Map();

    scrapedEvents.forEach(event => {
        if (urlMap.has(event.eventUrl)) {
            let existingEvent = urlMap.get(event.eventUrl);
            existingEvent.categories = existingEvent.categories.concat(';', event.categories);

            return;
        }

        urlMap.set(event.eventUrl, event);
    });

    return Array.from(urlMap.values());
}

function convertScrapedEventsToEvents(scrapedEvents) {
    let events = scrapedEvents.map(scrapedEvent => convertScrapedEventToEvent(scrapedEvent));

    return events;
};

function convertScrapedEventToEvent(scrapedEvent) {
    let parsedDates = scrapedEvent.dates.split(';').map(date => parseDate(date));

    return new Event(
        scrapedEvent.eventUrl,
        scrapedEvent.name,
        scrapedEvent.description,
        scrapedEvent.price,
        scrapedEvent.location,
        scrapedEvent.imageUrl,
        scrapedEvent.datesRaw,
        parsedDates,
        scrapedEvent.categories, // lista separado con ;
        scrapedEvent.latitud,
        scrapedEvent.longitud
    );
}

function parseDate(date) {
    return new Date(date);
}

export default eventsManager;