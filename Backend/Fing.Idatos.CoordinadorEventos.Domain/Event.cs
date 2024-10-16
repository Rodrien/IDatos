namespace Fing.Idatos.CoordinadorEventos.Domain
{
    public class Event
    {
        public long Id { get; set; }

        public string EventUrl { get; set; }

        public string EventName { get; set; }

        public string Description { get;set; }

        public string Location { get; set; }

        public string ImageUrl { get; set; }

        public string Latitud { get; set; }

        public string Longitud { get; set; }

        public List<DateTime> Dates { get; set; }

        public List<Category> Categories { get; set; }

        private Event()
        {
            Dates = new List<DateTime>();
            Categories = new List<Category>();
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
