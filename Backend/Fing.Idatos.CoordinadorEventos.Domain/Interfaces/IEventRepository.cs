namespace Fing.Idatos.CoordinadorEventos.Domain.Interfaces
{
    public interface IEventRepository
    {
        Task<Event> CreateEvent(Event eventToCreate);

        Task<int> CreateMultipleEvents(List<Event> events);
    }
}
