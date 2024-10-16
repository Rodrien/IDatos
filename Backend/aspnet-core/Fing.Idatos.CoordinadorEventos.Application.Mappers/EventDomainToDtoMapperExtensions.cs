using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain;

namespace Fing.Idatos.CoordinadorEventos.Application.Mappers
{
    public static class EventDomainToDtoMapperExtensions
    {
        public static EventDto MapToDto(this Event eventEntity)
        {
            return new EventDto();
        }
    }
}
