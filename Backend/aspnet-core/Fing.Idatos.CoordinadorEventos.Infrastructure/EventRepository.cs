using Fing.Idatos.CoordinadorEventos.Domain.Entities;
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
        foreach (Event ev in events)
        {
            if (_context.Events.Where(e => ev.Name.ToLower() == e.Name.ToLower()).FirstOrDefault() is null)
            {
                _context.Events.Add(ev);
            }
        }

        var addedCount = _context.ChangeTracker.Entries<Event>().Count(e => e.State == EntityState.Added);

        await _context.SaveChangesAsync();

        return addedCount;
    }

    public async Task<List<Event>> GetAsync(string searchTerm, string categoryName)
    {
        var entitys = await _context.Events
            .Include(e => e.Categories)
            .Where(e => string.IsNullOrEmpty(searchTerm) || e.Name.ToLower().Contains(searchTerm.ToLower()))
            .Where(e => string.IsNullOrEmpty(categoryName) || e.Categories.Any(c => c.Name.ToLower() == categoryName.ToLower()))
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

