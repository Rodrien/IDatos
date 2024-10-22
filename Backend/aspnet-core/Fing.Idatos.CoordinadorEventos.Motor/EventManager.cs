using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Motor.dto;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    public class EventManager : IEventManager
    {
        private readonly IEventRepository _eventRepository;

        public EventManager(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<int> CreateEventsInBulk(List<EventInputDto> events)
        {
            List<Event> processedEvents = events.Select(ProcessEvent).ToList();

            int createdCount = await _eventRepository.CreateMultipleEvents(processedEvents);

            return createdCount;
        }

        private Event ProcessEvent(EventInputDto @event)
        {
            Event newEvent = Event.Create(@event.Url, @event.Name, @event.Description, @event.Price, @event.ImageUrl, @event.Location, @event.Latitud, @event.Longitud);
                        
            List<DateTime> createdDateTimes = new List<DateTime>();
            @event.Dates.ForEach(date =>
            {
                DateTime dateTime = DateTime.Parse(date);
                createdDateTimes.Add(dateTime);
            });

            newEvent.AddDates(createdDateTimes);
            newEvent.AddCategoriesByName(@event.Categories);



            // TODO: Add logic to process events

            return newEvent;
        }
    }
}
