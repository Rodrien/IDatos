using Fing.Idatos.CoordinadorEventos.Api;
using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Application.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace Fing.Idatos.CoordinadorEventos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : CoordinadorEventosController
    {
        private readonly IEventService _eventService;

        public EventController(ILogger<CoordinadorEventosController> logger, IEventService eventService) : base(logger)
        {
            _eventService = eventService;
        }

        [HttpGet(":id")]
        public async Task<EventDto> Get(int id)
        {
            var entity = await _eventService.GetEventAsync(id);

            return entity.MapToDto();
        }

        [HttpGet]
        public async Task<List<EventDto>> Get()
        {
            var entitys = await _eventService.GetEventsAsync();

            var dtos = entitys.Select(e => e.MapToDto()).ToList();

            return dtos;
        }

        [HttpPost]
        public async Task<EventDto> Post(EventDto eventDto)
        {
            var eventEntity = eventDto.MapToEntity();

            var eventCreated = await _eventService.CreateEventAsync(eventEntity);

            return eventCreated.MapToDto();
        }
    }
}
