using Fing.Idatos.CoordinadorEventos.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Fing.Idatos.CoordinadorEventos.Domain.Services
{
    public class CategoryService : CoordinadorEventosDomainService, ICategoryService
    {

        public CategoryService(ILogger<CategoryService> logger) : base(logger)
        {
        }

        public List<string> GetUnifiedCategories(List<string> categories)
        {
            var mappedCategories = new HashSet<string>();

            foreach (var category in categories)
            {
                mappedCategories.Add(MapCategory(category));
            }

            return mappedCategories.ToList();
        }

        private string MapCategory(string category)
        {
            return category switch
            {
                "teatro" => CategoryType.teatro.ToString(),
                "musica" => CategoryType.musica.ToString(),
                "fiestas" => CategoryType.fiestas.ToString(),
                "deportes" => CategoryType.deportes.ToString(),
                "especiales" => CategoryType.especiales.ToString(),
                "futbol" => CategoryType.futbol.ToString(),
                "cursos" => CategoryType.cursos.ToString(),
                "giras" => CategoryType.giras.ToString(),
                "conferencias" => CategoryType.conferencias.ToString(),
                "familiares" => CategoryType.familiares.ToString(),
                "afiliados" => CategoryType.afiliados.ToString(),
                "empresarial" => CategoryType.empresarial.ToString(),
                "festivales" => CategoryType.festivales.ToString(),
                "danza" => CategoryType.especiales.ToString(), // Danza is a special case
                "otros" => CategoryType.otros.ToString(),
                _ => CategoryType.otros.ToString()
            };
        }
    }
}
