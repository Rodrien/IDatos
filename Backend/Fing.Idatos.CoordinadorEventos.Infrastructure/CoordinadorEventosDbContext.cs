using Fing.Idatos.CoordinadorEventos.Domain;
using Microsoft.EntityFrameworkCore;

namespace Fing.Idatos.CoordinadorEventos.Infrastructure
{
    public class CoordinadorEventosDbContext : DbContext
    {
        public DbSet<Event> Events { get; set; }

        public CoordinadorEventosDbContext(DbContextOptions<CoordinadorEventosDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add your model configuration here
        }
    }
}
