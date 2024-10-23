namespace Fing.Idatos.CoordinadorEventos.Domain
{
    public class Category
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public List<Event> Events { get; set; }
    }
}
