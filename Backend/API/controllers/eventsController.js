import asyncHandler from 'express-async-handler';
import { getEvents, getEvent, addEvent } from '../db/database.js';
import { statusCodes } from './statusCodes.js';
import eventsManager from '../logic/eventsManager.js';

let get = asyncHandler(async (req, res) => {
    const events = await getEvents();

    res.send(events);
});

let getById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const event = await getEvent(id);

    res.send(event);
});

let post = asyncHandler(async (req, res) => {
    console.log(req.body);
    const event = req.body;
    const createdEventId = await addEvent(event);

    let returnDto = {
        "createdEventId": createdEventId
    };

    res.status(statusCodes.CREATED).send(returnDto);
});

// Uses scrapedEvent.js as model
let postBulk = asyncHandler(async (req, res) => {
    const events = req.body.events;
    let eventManager = new eventsManager();

    const numberOfCreatedEvents = await eventManager.addScrapedEvents(events);

    let returnDto = {
        "numberOfCreatedEvents": numberOfCreatedEvents
    };

    res.status(statusCodes.CREATED).send(returnDto);
});

export default { get, getById, post, postBulk }; 