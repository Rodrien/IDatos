namespace Fing.Idatos.CoordinadorEventos.Domain.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> GetById(int id);

        Task<Category> GetByName(string name);
    }
}
