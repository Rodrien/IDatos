namespace Fing.Idatos.CoordinadorEventos.Domain
{
    public class Event
    {
        string EventUrl { get; set; }

        string EventName { get; set; }

        string Description { get;set; }

        string Location { get; set; }

        string ImageUrl { get; set; }

        string Latitud { get; set; }

        string Longitud { get; set; }

        List<DateTime> Dates { get; set; }

        List<string> Categories { get; set; }

        private Event()
        {
            Dates = new List<DateTime>();
            Categories = new List<string>();
        }

        public static Event Create()
        {
            return new Event();
        }

        /*
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
         
         */
    }
}
