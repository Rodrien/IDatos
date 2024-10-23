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
            //modelBuilder.Entity<Event>().Property(e => e.Id).ValueGeneratedOnAddOrUpdate();
            modelBuilder.Entity<Event>().HasMany(e => e.Categories);

            //modelBuilder.Entity<Category>().Property(c => c.Id).ValueGeneratedOnAddOrUpdate();
            modelBuilder.Entity<Category>().HasMany(c => c.Events);
            modelBuilder.Entity<Category>()
                .ToTable("Categories")
                .HasKey(c => c.Id);
            modelBuilder.Entity<Category>()
                .HasData(
                    new Category { Id = 1, Name = "teatro" }, // CategoryType
                    new Category { Id = 2, Name = "musica" },
                    new Category { Id = 3, Name = "deportes" },
                    new Category { Id = 4, Name = "danza" },
                    new Category { Id = 5, Name = "especiales" },
                    new Category { Id = 6, Name = "futbol" },
                    new Category { Id = 7, Name = "cursos" },
                    new Category { Id = 8, Name = "giras" },
                    new Category { Id = 9, Name = "conferencias" },
                    new Category { Id = 10, Name = "familiares" },
                    new Category { Id = 11, Name = "afiliados" },
                    new Category { Id = 12, Name = "empresarial" },
                    new Category { Id = 13, Name = "festivales" },
                    new Category { Id = 14, Name = "fiestas" },
                    new Category { Id = 99, Name = "otros" }
                );
        }
    }
}
