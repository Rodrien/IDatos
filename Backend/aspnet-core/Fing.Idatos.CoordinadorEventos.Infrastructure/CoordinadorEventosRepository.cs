using Microsoft.Extensions.Logging;

namespace Fing.Idatos.CoordinadorEventos.Infrastructure
{
    public class CoordinadorEventosRepository
    {
        protected readonly ILogger<CoordinadorEventosRepository> Logger;

        public CoordinadorEventosRepository(ILogger<CoordinadorEventosRepository> logger)
        {
            Logger = logger;
        }                                   
    }
}
