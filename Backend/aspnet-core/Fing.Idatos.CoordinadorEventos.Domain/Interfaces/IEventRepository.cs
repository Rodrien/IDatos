using Fing.Idatos.CoordinadorEventos.Domain.Entities;

namespace Fing.Idatos.CoordinadorEventos.Domain.Interfaces
{
    public interface IEventRepository
    {
        Task<Event> CreateEvent(Event eventToCreate);

        Task<int> CreateMultipleEvents(List<Event> events);

        Task<List<Event>> GetAsync(string searchTerm, string categoryName);

        Task<Event> GetAsync(long id);
    }
}
