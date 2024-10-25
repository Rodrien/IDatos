using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain.Entities;

namespace Fing.Idatos.CoordinadorEventos.Application.Mappers
{
    public static class EventDtoToDomainMapperExtensions
    {
        public static Event MapToEntity(this EventDto eventDto)
        {
            return new Event();
            //return Event.Create();
        }
    }
}
