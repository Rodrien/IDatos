using Fing.Idatos.CoordinadorEventos.Api;
using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Application.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : CoordinadorEventosController
    {
        private readonly IEventManager _eventManager;
        public EventController(ILogger<EventController> logger, IEventManager eventManager) : base(logger)
        {
            _eventManager = eventManager;
        }

        [HttpPost(Name = "Post")]
        public async Task<int> CreateEventsInBulk(List<EventDto> events)
        {
            var eventEntities = events.Select(e => e.MapToEntity()).ToList();

            try
            {
                int insertCount = await _eventManager.CreateEventsInBulk(eventEntities);

                return insertCount;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, ex.Message);

                throw;
            }
        }
    }
}
