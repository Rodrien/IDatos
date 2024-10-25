using Microsoft.Extensions.Logging;

namespace Fing.Idatos.CoordinadorEventos.Domain
{
    public abstract class CoordinadorEventosDomainService
    {
        protected readonly ILogger<CoordinadorEventosDomainService> Logger;

        public CoordinadorEventosDomainService(ILogger<CoordinadorEventosDomainService> logger)
        {
            Logger = logger;
        }
    }
}
