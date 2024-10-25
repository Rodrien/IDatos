using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Domain.Entities;

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

        public async Task<Event> GetEventAsync(int id)
        {
            var @event = await _eventRepository.GetAsync(id);
            
            return @event;
        }

        public async Task<List<Event>> GetEventsAsync()
        {
            var events = await _eventRepository.GetAsync();

            return events;
        }
    }
}
