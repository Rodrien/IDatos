using Fing.Idatos.CoordinadorEventos.Domain.Entities;

namespace Fing.Idatos.CoordinadorEventos.Application.Contracts
{
    public interface IEventService
    {
        Task<Event> CreateEventAsync(Event eventToCreate);

        Task<Event> GetEventAsync(int id);

        Task<List<Event>> GetEventsAsync(string searchTerm, string categoryName);
    }
}
