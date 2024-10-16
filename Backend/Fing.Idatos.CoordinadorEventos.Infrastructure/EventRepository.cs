using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;

namespace Fing.Idatos.CoordinadorEventos.Infrastructure;

public class EventRepository : IEventRepository
{
    private readonly CoordinadorEventosDbContext _context;

    public EventRepository(CoordinadorEventosDbContext context)
    {
        _context = context;
    }

    public async Task<Event> CreateEvent(Event eventToCreate)
    {
        _context.Events.Add(eventToCreate);
        await _context.SaveChangesAsync();

        return eventToCreate;
    }

    public async Task<int> CreateMultipleEvents(List<Event> events)
    {
        return 0;
    }
}

