using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Fing.Idatos.CoordinadorEventos.Api
{
    public class CoordinadorEventosController : ControllerBase
    {
        protected readonly ILogger<CoordinadorEventosController> Logger;

        public CoordinadorEventosController(ILogger<CoordinadorEventosController> logger)
        {
            Logger = logger;
        }
    }
}
