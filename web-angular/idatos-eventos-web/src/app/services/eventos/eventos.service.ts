import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Evento } from "src/app/models/evento";
import { map, Observable, of } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class EventosService {
  // Map of lat,lng to address, using to optimize times
  private mapLatLngToAddress: Map<{ lat: number; lng: number }, string> =
    new Map();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedMap = localStorage.getItem("mapLatLngToAddress");
      if (storedMap) {
        this.mapLatLngToAddress = new Map(JSON.parse(storedMap));
      }
    }
  }

  getEventos(params?: {
    text: string;
    category: string;
  }): Observable<Evento[]> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = httpParams.append("searchTerm", params.text);
      httpParams = httpParams.append("categoryName", params.category);
    }
    return this.http.get<Evento[]>("http://localhost:8080/Event", {
      params: httpParams,
    });
  }

  getEventById(id: number): Observable<Evento | undefined> {
    // this for existing endpoint:
    return this.http
      .get<Evento[]>(`http://localhost:8080/Event/`)
      .pipe(map((eventos) => eventos.find((evento) => evento.id === id)));

    // this if endpoint is working:
    // return this.http.get<Evento>(`http://localhost:8080/Event/${id}`);
  }

  /**** Test methods! ****/

  // getEventosTest(): Observable<Evento[]> {
  //   return of(mockEvents);
  // }

  // getEventByIdTest(id: number): Observable<Evento | undefined> {
  //   return of(mockEvents.find((evento) => evento.id === id));
  // }

  formatDates(dates: string[]): string {
    return dates.map((date) => new Date(date).toLocaleDateString()).join(", ");
  }

  eventDescriptionIsValid(event: Evento) {
    if (event.description.includes("Lo sentimos, TickAntel")) return false;
    return true;
  }

  eventLocationIsValid(event: Evento) {
    if (event.location?.includes("Guatemala 1075")) return false;
    return true;
  }

  getAddress(lat: number, lng: number): Promise<string | undefined> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    if (this.mapLatLngToAddress.has({ lat, lng })) {
      return Promise.resolve(this.mapLatLngToAddress.get({ lat, lng }));
    } else {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.display_name) {
            this.mapLatLngToAddress.set({ lat, lng }, data.display_name);
            localStorage.setItem(
              "mapLatLngToAddress",
              JSON.stringify(Array.from(this.mapLatLngToAddress.entries()))
            );
            return data.display_name;
          } else {
            console.log("No address found for these coordinates.");
            return undefined;
          }
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
          return undefined;
        });
    }
  }
}

const baseUrl = "https://angular.dev/assets/images/tutorials/common";

// export const mockEvents: Evento[] = [
//   {
//     id: 1,
//     url: "https://redtickets.uy/evento/event-1",
//     name: "Event One",
//     description: "Description of Event One",
//     price: 1500,
//     currency: "$UYU",
//     location: "Teatro Solís",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9065",
//     longitud: "-56.1992",
//     dates: ["2025-03-10T00:00:00Z"],
//     categories: [{ id: 1, name: "teatro" }],
//   },
//   {
//     id: 2,
//     url: "https://redtickets.uy/evento/event-2",
//     name: "Event Two",
//     description: "Description of Event Two",
//     price: 1800,
//     currency: "$UYU",
//     location: "Auditorio Nacional",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.8977",
//     longitud: "-56.1878",
//     dates: ["2025-04-15T00:00:00Z"],
//     categories: [{ id: 2, name: "música" }],
//   },
//   {
//     id: 3,
//     url: "https://redtickets.uy/evento/event-3",
//     name: "Event Three",
//     description: "Description of Event Three",
//     price: 1200,
//     currency: "$UYU",
//     location: "Teatro El Galpón",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9054",
//     longitud: "-56.1782",
//     dates: ["2025-05-20T00:00:00Z"],
//     categories: [{ id: 1, name: "teatro" }],
//   },
//   {
//     id: 4,
//     url: "https://redtickets.uy/evento/event-4",
//     name: "Event Four",
//     description: "Description of Event Four",
//     price: 2000,
//     currency: "$UYU",
//     location: "Antel Arena",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.8875",
//     longitud: "-56.1509",
//     dates: ["2025-06-10T00:00:00Z"],
//     categories: [{ id: 2, name: "música" }],
//   },
//   {
//     id: 5,
//     url: "https://redtickets.uy/evento/event-5",
//     name: "Event Five",
//     description: "Description of Event Five",
//     price: 1600,
//     currency: "$UYU",
//     location: "Sala Zitarrosa",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9071",
//     longitud: "-56.1989",
//     dates: ["2025-07-15T00:00:00Z"],
//     categories: [{ id: 1, name: "teatro" }],
//   },
//   {
//     id: 6,
//     url: "https://redtickets.uy/evento/event-6",
//     name: "Event Six",
//     description: "Description of Event Six",
//     price: 1400,
//     currency: "$UYU",
//     location: "Complejo Cultural",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9128",
//     longitud: "-56.2031",
//     dates: ["2025-08-10T00:00:00Z"],
//     categories: [{ id: 2, name: "música" }],
//   },
//   {
//     id: 7,
//     url: "https://redtickets.uy/evento/event-7",
//     name: "Event Seven",
//     description: "Description of Event Seven",
//     price: 1700,
//     currency: "$UYU",
//     location: "Centro Cultural",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9155",
//     longitud: "-56.2038",
//     dates: ["2025-09-05T00:00:00Z"],
//     categories: [{ id: 3, name: "danza" }],
//   },
//   {
//     id: 8,
//     url: "https://redtickets.uy/evento/event-8",
//     name: "Event Eight",
//     description: "Description of Event Eight",
//     price: 1300,
//     currency: "$UYU",
//     location: "Plaza de las Artes",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9132",
//     longitud: "-56.1987",
//     dates: ["2025-10-01T00:00:00Z"],
//     categories: [{ id: 4, name: "cine" }],
//   },
//   {
//     id: 9,
//     url: "https://redtickets.uy/evento/event-9",
//     name: "Event Nine",
//     description: "Description of Event Nine",
//     price: 2100,
//     currency: "$UYU",
//     location: "Parque Rodó",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9153",
//     longitud: "-56.1976",
//     dates: ["2025-11-10T00:00:00Z"],
//     categories: [{ id: 3, name: "danza" }],
//   },
//   {
//     id: 10,
//     url: "https://redtickets.uy/evento/event-10",
//     name: "Event Ten",
//     description: "Description of Event Ten",
//     price: 1900,
//     currency: "$UYU",
//     location: "Plaza Independencia",
//     imageUrl: `${baseUrl}/example-house.jpg`,
//     latitud: "-34.9061",
//     longitud: "-56.2013",
//     dates: ["2025-12-15T00:00:00Z"],
//     categories: [{ id: 1, name: "teatro" }],
//   },
// ];
