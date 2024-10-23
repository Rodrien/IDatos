using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Fing.Idatos.CoordinadorEventos.Infrastructure;

public class EventRepository : CoordinadorEventosRepository, IEventRepository
{
    private readonly CoordinadorEventosDbContext _context;

    public EventRepository(CoordinadorEventosDbContext context, ILogger<EventRepository> logger) : base(logger)
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

        var addedCount = _context.ChangeTracker.Entries<Event>().Count(e => e.State == EntityState.Added);

        await _context.SaveChangesAsync();

        return addedCount;
    }

    public async Task<List<Event>> GetAsync()
    {
        var entitys = await _context.Events
            .Include(e => e.Categories)
            .ToListAsync();

        return entitys;
    }

    public async Task<Event> GetAsync(long id)
    {
        var entity = await _context.Events.Where(e => e.Id == id)
            .Include(e => e.Categories)
            .FirstOrDefaultAsync();

        return entity;
    }
}

