﻿namespace Fing.Idatos.CoordinadorEventos.Domain.Entities
{
    public class Event
    {
        public long Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public Currency Currency { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public string Latitud { get; set; }

        public string Longitud { get; set; }

        public List<DateTime> Dates { get; set; }

        public List<Category> Categories { get; set; }

        private Event() // TODO: Pasar contructor a privado
        {
            Dates = new List<DateTime>();
            Categories = new List<Category>();
        }

        public static Event Create(string url, string name, string description, decimal price, Currency currency, string location, string imageUrl, string latitud, string longitud)
        {
            if (Currency.UYU == currency)
            {
                return new Event()
                {
                    Url = url,
                    Name = name,
                    Description = description,
                    Price = price,
                    Currency = currency,
                    Location = location,
                    ImageUrl = imageUrl,
                    Latitud = latitud,
                    Longitud = longitud
                };
            }

            return new Event()
            {
                Url = url,
                Name = name,
                Description = description,
                Price = price * 40, // 1 dolar = 40 pesos
                Currency = Currency.UYU,
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

        public void AddCategories(List<Category> categories)
        {
            Categories = categories;
        }

        public static Event Create(string url, string name, string description, decimal price, object value, string imageUrl, string location, string latitud, string longitud)
        {
            throw new NotImplementedException();
        }
    }
}
