using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain;

namespace Fing.Idatos.CoordinadorEventos.Application.Mappers
{
    public static class EventDtoToDomainMapperExtensions
    {
        public static Event MapToEntity(this EventDto eventDto)
        {
            return Event.Create();
        }
    }
}
