using Fing.Idatos.CoordinadorEventos.Application.Contracts;
using Fing.Idatos.CoordinadorEventos.Domain.Entities;

namespace Fing.Idatos.CoordinadorEventos.Application.Mappers
{
    public static class EventDomainToDtoMapperExtensions
    {
        public static EventDto MapToDto(this Event eventEntity)
        {
            return new EventDto()
            {
                Id = eventEntity.Id,
                Name = eventEntity.Name,
                Url = eventEntity.Url,
                Description = eventEntity.Description,
                Price = eventEntity.Price,
                Currency = eventEntity.Currency.ToSymbol(),
                ImageUrl = eventEntity.ImageUrl,
                Location = eventEntity.Location,
                Latitud = eventEntity.Latitud,
                Longitud = eventEntity.Longitud,
                Dates = eventEntity.Dates,
                Categories = eventEntity.Categories.Select(MapToDto).ToList()
            };
        }

        public static CategoryDto MapToDto(this Category category)
        {
            return new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name
            };
        }
    }
}
