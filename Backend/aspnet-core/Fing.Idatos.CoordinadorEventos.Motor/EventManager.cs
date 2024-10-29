using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Entities;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Fing.Idatos.CoordinadorEventos.Motor.dto;
using static Fing.Idatos.CoordinadorEventos.Domain.Entities.CurrencyExtensions;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    public class EventManager : IEventManager
    {
        private readonly ILogger<EventManager> _logger;
        private readonly IEventRepository _eventRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICategoryService _categoryService;

        public EventManager(ILogger<EventManager> logger, 
            IEventRepository eventRepository, 
            ICategoryRepository categoryRepository,
            ICategoryService categoryService)
        {
            _logger = logger;
            _eventRepository = eventRepository;
            _categoryRepository = categoryRepository;
            _categoryService = categoryService;
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
            Event newEvent = Event.Create(
                @event.Url, 
                @event.Name, 
                @event.Description, 
                @event.Price,
                FromString(@event.Currency),
                @event.ImageUrl, 
                @event.Location, 
                @event.Latitud, 
                @event.Longitud);
            
            AddUtcDates(newEvent, @event.Dates);
            await AddCategoriesByName(newEvent, @event.Categories);

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
        public async Task AddCategoriesByName(Event @event, List<string> categoryNames)
        {
            List<string> newCategoryNames = _categoryService.GetUnifiedCategories(categoryNames);

            List<Category> categories = new List<Category>();
            foreach (var name in newCategoryNames)
            {
                _logger.LogInformation($"Buscando categoria: {name}");
                var dbCategory = await _categoryRepository.GetByName(name);
                if (dbCategory is null)
                {
                    dbCategory = await _categoryRepository.GetByName(CategoryType.otros.ToString());
                }

                categories.Add(dbCategory);
            }

            @event.AddCategories(categories);
        }
    }
}
