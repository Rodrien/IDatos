using Fing.Idatos.CoordinadorEventos.Domain;
using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Fing.Idatos.CoordinadorEventos.Infrastructure
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly CoordinadorEventosDbContext _context;

        public CategoryRepository(CoordinadorEventosDbContext context)
        {
            _context = context;
        }

        public async Task<Category> GetById(int id)
        {
            return await _context.Categories.Where(c => c.Id == id).FirstOrDefaultAsync()!;
        }

        public async Task<Category> GetByName(string name)
        {
            return await _context.Categories.Where(c => c.Name == name).FirstOrDefaultAsync()!;
        }
    }
}
