using Fing.Idatos.CoordinadorEventos.Application.Contracts;

namespace Fing.Idatos.CoordinadorEventos.Motor.dto
{
    public class EventInputDto
    {
        public long Id { get; set; }

        public string Url { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public long Price { get; set; }

        public string Moneda { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public string Latitud { get; set; }

        public string Longitud { get; set; }

        public string DatesString { get; set; }

        public List<string> Dates { get; set; }

        public List<string> Categories { get; set; }
    }
} 

/*
 
 // Formato nuevo
{
  'name': 'LOS MOSQUETEROS DEL REY EN PAYSANDU',
  'eventUrl': 'https: //redtickets.uy/evento/LOS-MOSQUETEROS-DEL-REY-EN-PAYSANDU/16374/',
  'description': 'Nicol�s Cabr�, Jorge Su�rez, Nicol�s Scarpino y Fredy Villarreal, juntos para hacer re�r durante 90 minutos con una obra galardonada con premios y distinciones nacionales e internacionales.\nCuatro actores tratan de dar inicio a la funci�n. Sin embargo, una serie de incidentes se los impide, ya sea porque olvidan los textos, se confunden con los momentos de entrada y salida, hay contradicciones o comentarios sobre la informaci�n del relato. Poco a poco, intentan montar la c�lebre novela de Dumas, pero las complicaciones se incrementan hasta el momento donde deben tomar una decisi�n radical.\nLos Mosqueteros del Rey explora la comedia a partir del juego del "error actoral" y construye una pieza desopilante, ocurrente e imperdible.\n',
  'price': '100', -> numero valor ,
  'moneda': 'UYU', -> string (moneda) (O USD)
  'location': 'Teatro la Candela',
  'imageUrl': 'https: //files.redtickets.uy/imagenes/8f762b22-1f79-4a04-a40f-870ae90fe917_Event_0.jpg',
  'datesRaw': 'S�bado 19 de Octubre & 1 m�s',
  'dates': '2025-10-19', -> string (formato YYYY-MM-DD)
  'categories': ['teatro', 'pelea'], -> lista de strings (nombre de categoria) (En el motor las agrupamos y eso)
  'latitud': '-32.31769300',
  'longitud': '-58.08394400'
}
 */


