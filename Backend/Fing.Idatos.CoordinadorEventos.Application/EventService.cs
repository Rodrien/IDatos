using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Domain;

namespace Fing.Idatos.CoordinadorEventos.Application
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<Event> CreateEventAsync(Event eventToCreate)
        {
            var createdEvent = await _eventRepository.CreateEvent(eventToCreate);

            return createdEvent;
        }

        public Task<Event> GetEventAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Event>> GetEventsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
