export const eventDBQueries = {
    addEvent: 'INSERT INTO events (eventUrl, name, description, price, location, imageUrl, datesRaw, categories, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
    //addEvents: 'INSERT INTO events (title, location, date, category) VALUES ?;',
    getEvent: 'SELECT * FROM events WHERE eventUrl = ?;',
    getEvents: 'SELECT * FROM events;',
    updateEventCategories: 'UPDATE events SET categories = ? WHERE eventUrl = ?;',
};

export const dateDBQueries = {
    addDate: 'INSERT INTO dates (eventUrl, date) VALUES (?, ?);',
    getDates: 'SELECT * FROM dates WHERE eventUrl = ?;',
    getAllDates: 'SELECT * FROM dates;',
};