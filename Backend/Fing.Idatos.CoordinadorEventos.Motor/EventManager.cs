using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    public class EventManager : IEventManager
    {
        private readonly IEventRepository _eventRepository;

        public EventManager(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<int> CreateEventsInBulk(List<Event> events)
        {
            // TODO: Add logic to unify events

            int createdCount = await _eventRepository.CreateMultipleEvents(events);

            return createdCount;
        }
    }
}
