class ScrapedEvent {
    constructor(name, description, imageUrl, location, datesRaw, dates, price, categories, latitud, longitud, eventUrl) {
        this.name = name;
        this.description = description
        this.imageUrl = imageUrl;
        this.location = location;
        this.datesRaw = datesRaw;
        this.dates = dates; // list of date string seperated with ;
        this.price = price;
        this.categories = categories; // list of date string seperated with ;
        this.latitud = latitud;
        this.longitud = longitud;
        this.eventUrl = eventUrl;
    }
}

export default ScrapedEvent;