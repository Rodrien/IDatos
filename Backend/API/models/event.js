class Event {
    constructor(eventUrl, name, description, price, location, imageUrl, datesRaw, dates, categories, latitud, longitud) {
        this.eventUrl = eventUrl;
        this.name = name;
        this.description = description;
        this.price = price; // string
        this.location = location;
        this.imageUrl = imageUrl;
        this.datesRaw = datesRaw; // Ex: "23 de noviembre y 3 mas"
        this.dates = dates; // []
        this.categories = categories;// string of categorias string con ;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

export default Event;