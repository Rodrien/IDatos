using Fing.Idatos.CoordinadorEventos.Domain;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    public interface IEventManager
    {
        Task<int> CreateEventsInBulk(List<Event> events);
    }
}
