using Fing.Idatos.CoordinadorEventos.Motor.dto;

namespace Fing.Idatos.CoordinadorEventos.Motor
{
    public interface IEventManager
    {
        Task<int> CreateEventsInBulk(List<EventInputDto> events);
    }
}
