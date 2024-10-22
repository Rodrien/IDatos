using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Motor.dto;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    public class EventManager : IEventManager
    {
        private readonly IEventRepository _eventRepository;
        private readonly ICategoryRepository _categoryRepository;

        public EventManager(IEventRepository eventRepository, ICategoryRepository categoryRepository)
        {
            _eventRepository = eventRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<int> CreateEventsInBulk(List<EventInputDto> events)
        {
            List<Event> processedEvents = new();
            foreach(var e in events)
            {
                processedEvents.Add(await ProcessEvent(e));
            }

            int createdCount = await _eventRepository.CreateMultipleEvents(processedEvents);

            return createdCount;
        }

        private async Task<Event> ProcessEvent(EventInputDto @event)
        {
            Event newEvent = Event.Create(@event.Url, @event.Name, @event.Description, @event.Price, @event.ImageUrl, @event.Location, @event.Latitud, @event.Longitud);

            AddUtcDates(newEvent, @event.Dates);
            await AddCategoriesByName(newEvent, @event.Categories);

            // agregar log aca para ver el evento porque ni idea el error que tira

            // TODO: Add logic to process events

            return newEvent;
        }

        private void AddUtcDates(Event @event, List<string> dates)
        {
            List<DateTime> createdDateTimes = new List<DateTime>();
            dates.ForEach(date =>
            {
                DateTime dateTime = DateTime.Parse(date).ToUniversalTime();
                createdDateTimes.Add(dateTime);
            });

            @event.AddDates(createdDateTimes);
        }

        // TODO: Move this method to a domain service! 
        // TODO: Add union of categories
        public async Task AddCategoriesByName(Event @event, List<string> categoryNames)
        {
            List<Category> categories = new List<Category>();
            foreach (var name in categoryNames)
            {
                var dbCategory = await _categoryRepository.GetByName(name);
                categories.Add(dbCategory);
            }

            @event.AddCategories(categories);
        }
    }
}
