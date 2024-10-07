import mysql from 'mysql2';
import { dateDBQueries, eventDBQueries } from './queries.js';

const pool = mysql.createPool({
    host: 'mysql',
    user: 'dbuser',
    password: 'dbuser',
    database: 'coordinador_eventos'
}).promise();

export async function getEvents() {
    let events = [];
    const [rows] = await pool.query(eventDBQueries.getEvents);

    if (rows) {
        for (let row of rows) {
            const dates = await getEventDatesAsDates(row.eventUrl);
            row.dates = dates;

            events.push(row);
        }
    }

    return events;
}

export async function getEvent(id) {
    const [rows] = await pool.query(eventDBQueries.getEvent, [id]);
    let event = rows[0];

    if (event) {
        const [dates] = await getEventDatesAsDates(id);
        event.dates = dates;
    }

    return event;
}

export async function addEvent(event) {
    // Add dates of event
    for (let date of event.dates) {
        await pool.query(dateDBQueries.addDate, [event.eventUrl, date]);
    }

    // Add event
    const result = await pool.query(eventDBQueries.addEvent, [event.eventUrl, event.name, event.description, event.price, event.location, event.imageUrl, event.datesRaw, event.categories, event.latitud, event.longitud]);

    return result[0].insertId;
}

export async function addEvents(events) {
    let addedEvents = 0;
    for (let event of events) {
        const currentEvent = await getEvent(event.eventUrl);

        if (currentEvent) {
            // Event exists so we join categories
            const currentEventCategories = currentEvent.categories.split(';');
            const eventCategories = event.categories.split(';');

            eventCategories.forEach(category => {
                if (!currentEventCategories.includes(category)) {
                    currentEventCategories.push(category);
                }
            });

            event.categories = currentEventCategories.join(';');

            await updateEventCategories(event);

            continue;
        }

        await addEvent(event);
        addedEvents++;
    }

    return addedEvents;
}

async function getEventDatesAsDates(eventUrl) {
    const rows = await pool.query(dateDBQueries.getDates, [eventUrl]);
    const datesDB = rows[0];

    let dates = [];
    for (let dateDB of datesDB) {
        dates.push(new Date(dateDB.date));
    }

    return dates;
}

async function updateEventCategories(event) {
    await pool.query(eventDBQueries.updateEventCategories, [event.categories, event.eventUrl]);
}