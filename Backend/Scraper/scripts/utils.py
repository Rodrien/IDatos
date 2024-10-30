from datetime import datetime
import json
import requests
import re

redtickets_categories_url = {
    'teatro': 'https://redtickets.uy/categoria/6/Teatro',
    # 'musica': 'https://redtickets.uy/categoria/3/Música',
    # 'fiestas': 'https://redtickets.uy/categoria/9/Fiestas',
    # 'deportes': 'https://redtickets.uy/categoria/2/Deportes',
    # 'especiales': 'https://redtickets.uy/categoria/7/Especiales',
    # 'futbol': 'https://redtickets.uy/categoria/8/Fútbol',
    # 'cursos': 'https://redtickets.uy/categoria/4/Cursos',
    # 'giras': 'https://redtickets.uy/categoria/12/Giras',
    # 'conferencias': 'https://redtickets.uy/categoria/5/Conferencias',
    # 'familiares': 'https://redtickets.uy/categoria/1/Familiares',
    # 'afiliados': 'https://redtickets.uy/categoria/28/Afiliados',  
    # 'empresarial': 'https://redtickets.uy/categoria/13/Empresarial',
    # 'festivales': 'https://redtickets.uy/categoria/30/Festivales'
}

tickantel_categories_url = {
    'teatro': 'https://tickantel.com.uy/inicio/buscar_categoria?5&cat_id=1',
    'musica': 'https://tickantel.com.uy/inicio/buscar_categoria?1&cat_id=2',
    'deportes': 'https://tickantel.com.uy/inicio/buscar_categoria?2&cat_id=6',
    'danza': 'https://tickantel.com.uy/inicio/buscar_categoria?4&cat_id=10',
    'otros': 'https://tickantel.com.uy/inicio/buscar_categoria?3&cat_id=7'
}

def get_redtickets_category_url(category):
    return redtickets_categories_url[category]

def get_tickantel_category_url(category):
    return tickantel_categories_url[category]

def divide_chunks(l, n): 
    # looping till length l 
    result = []
    for i in range(0, len(l), n):  
        result.append(l[i:i + n])
    return result 

def map_events_for_API(events):
    mapped_events = [] 
    
    for event in events:
        try:
            location_url = event['location_url']
            if 'openstreetmap' in location_url:
                bbox_part = re.search(r"bbox=([^&]+)", location_url).group(1)
                # Separar los valores de bbox en latitud y longitud
                bbox_values = bbox_part.split(',')
                latitude = bbox_values[0]
                longitude = bbox_values[1]
            else:
                latitude_and_longitude = location_url.split("&q=")
                latitude_and_longitude_string = latitude_and_longitude[1]
                latitude_and_logintude_splitted = latitude_and_longitude_string.split("%20,%20")
                latitude = latitude_and_logintude_splitted[0]
                longitude = latitude_and_logintude_splitted[1].split("&zoom")[0]
        except:
            latitude = 0
            longitude = 0
        try: 
            mapped_event = {
                "name" : event['title'],
                "url": event['event_url'],
                "description": event['description'],
                "price": event['price'],
                "currency": "UYU",
                "location": event['location_text'], 
                "imageUrl": event['img_url'], 
                "datesString": event['dates_raw'],
                "dates": event['dates'],
                "categories": event['category'],
                "latitud": str(latitude), 
                "longitud": str(longitude)
            }
            print("mapped event:" + str(mapped_event))
            mapped_events.append(mapped_event)
        except: 
            print ("ERROR AL MAPEAR EL EVENTO" + event)
    return mapped_events


meses = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
    "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
    "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
}

def send_events_to_database(events, categories): 
    listed_events = []
    for category in categories:
        listed_events.extend(events[category])
    events = map_events_for_API(listed_events)

    # # save json
    # with open("jsonGeneradoRedTickets.txt", "w") as text_file:
    #     # text_file.write("\n".join(events))
    #     for line in events:
    #         text_file.write("%s\n" % line)


    chunked_events = divide_chunks(events, 10)
    for events in chunked_events:
        # body = {"events": events}
        body = events
        body = json.dumps(body)
        print("body sent to database: " + str(body))
        try:
            response = requests.post("http://localhost:8088/Event", data= body, headers={"Content-Type": "application/json"})
            print("response from motor: " + str(response))
        except:
            print("Error al enviar los eventos a la base de datos" + str(body))

def convertir_fecha(fecha_str):
    try:
        partes = fecha_str.split()
        dia = int(partes[0])
        mes = meses[partes[2].lower()]
        año_actual = datetime.now().year
        ahora = datetime.now()

        # Crear un objeto datetime con la fecha proporcionada este año
        fecha = datetime(año_actual, mes, dia)

        # Si la fecha ya ha pasado este año, entonces será el próximo año
        if fecha < ahora:
            año_actual += 1
            fecha = datetime(año_actual, mes, dia)
        
        return fecha
    except:
        raise Exception()