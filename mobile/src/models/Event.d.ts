type Event = {
    name: string,
    urlImage: string,
    description: string,
    location: string,
    dates: Date[] | null,
    datesString: string,
    price: string,
    categories: string[]
    latitude: number | null;
    longitude: number | null;
    eventUrl: string;
};

export default Event