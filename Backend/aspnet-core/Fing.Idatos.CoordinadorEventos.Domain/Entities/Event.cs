namespace Fing.Idatos.CoordinadorEventos.Domain.Entities
{
    public class Event
    {
        public long Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public long Price { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public string Latitud { get; set; }

        public string Longitud { get; set; }

        public List<DateTime> Dates { get; set; }

        public List<Category> Categories { get; set; }

        public Event() // TODO: Pasar contructor a privado
        {
            Dates = new List<DateTime>();
            Categories = new List<Category>();
        }

        public static Event Create(string url, string name, string description, long price, string location, string imageUrl, string latitud, string longitud)
        {
            return new Event()
            {
                Url = url,
                Name = name,
                Description = description,
                Price = price,
                Location = location,
                ImageUrl = imageUrl,
                Latitud = latitud,
                Longitud = longitud
            };
        }

        public void AddDates(List<DateTime> dates)
        {
            dates = dates.Select(d => d.ToUniversalTime()).ToList(); // ojo aca con los utc.

            Dates.AddRange(dates);
        }

        public void AddCategoriesByName(List<string> categoryNames)
        {

        }

        public void AddCategories(List<Category> categories)
        {
            Categories = categories;
        }
    }
}
