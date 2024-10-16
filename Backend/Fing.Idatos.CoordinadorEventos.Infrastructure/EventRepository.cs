using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

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
        _context.Events.AddRange(events);
        await _context.SaveChangesAsync();

        return 0; // TODO: return the number of inserted events
    }

    public async Task<List<Event>> GetAsync()
    {
        var entitys = await _context.Events.ToListAsync();

        return entitys;
    }

    public async Task<Event> GetAsync(long id)
    {
        var entity = await _context.Events.Where(e => e.Id == id).FirstOrDefaultAsync();

        return entity;
    }
}

