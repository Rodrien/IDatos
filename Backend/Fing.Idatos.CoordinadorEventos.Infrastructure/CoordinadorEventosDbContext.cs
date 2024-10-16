using Fing.Idatos.CoordinadorEventos.Domain;
using Microsoft.EntityFrameworkCore;

namespace Fing.Idatos.CoordinadorEventos.Infrastructure
{
    public class CoordinadorEventosDbContext : DbContext
    {
        public DbSet<Event> Events { get; set; }

        public DbSet<Category> Categories { get; set; }

        public CoordinadorEventosDbContext(DbContextOptions<CoordinadorEventosDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Event>().HasKey(e => e.Id);
            modelBuilder.Entity<Event>()
                .HasMany(e => e.Categories);
                
            modelBuilder.Entity<Category>()
                .ToTable("Categories")
                .HasKey(c => c.Id);
        }
    }
}
