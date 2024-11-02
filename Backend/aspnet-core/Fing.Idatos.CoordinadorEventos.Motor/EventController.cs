using Fing.Idatos.CoordinadorEventos.Api;
using Fing.Idatos.CoordinadorEventos.Application.Mappers;
using Fing.Idatos.CoordinadorEventos.Motor.dto;
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
        public async Task<int> CreateEventsInBulk(List<EventInputDto> events)
        {
            try
            {
                int insertCount = await _eventManager.CreateEventsInBulk(events);

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
