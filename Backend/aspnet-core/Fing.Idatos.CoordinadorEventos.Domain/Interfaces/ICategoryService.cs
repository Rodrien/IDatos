namespace Fing.Idatos.CoordinadorEventos.Domain.Interfaces
{
    public interface ICategoryService
    {
        List<string> GetUnifiedCategories(List<string> categories);
    }
}
