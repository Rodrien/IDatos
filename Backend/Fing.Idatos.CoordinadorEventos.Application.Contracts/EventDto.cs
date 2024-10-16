namespace Fing.Idatos.CoordinadorEventos.Application.Contracts
{
    public class EventDto
    {
        public long Id { get; set; }

        public string EventUrl { get; set; }

        public string EventName { get; set; }

        public string Description { get; set; }

        public string Location { get; set; }

        public string ImageUrl { get; set; }

        public string Latitud { get; set; }

        public string Longitud { get; set; }

        public List<DateTime> Dates { get; set; }

        public List<CategoryDto> Categories { get; set; }
    }
}
