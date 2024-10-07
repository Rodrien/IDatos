import axios from "axios";
import Event from '../models/Event'

export const getEvents = async () => {
    const response: any = await axios.get('https://a071-2800-a4-c110-f600-bd00-4f7f-3a7e-6770.ngrok-free.app/events', { headers: { 'Content-Type': 'application/json' } });
    const res: Event[] = []
    response.data.map((data: any) => {
        const newEvent: Event = {
            name: data.name,
            categories: data.categories.split(";"),
            location: data.location,
            dates: [new Date(data.dates)],
            datesString: data.datesRaw,
            eventUrl: data.eventUrl,
            price: data.price,
            description: data.description,
            latitude: data.latitud,
            longitude: data.longitud,
            urlImage: data.imageUrl,
        }
        res.push(newEvent);
    })
    return res;
}