import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from 'src/app/models/evento';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    // return of([
    //   {
    //     id: 1,
    //     titulo: 'Evento 1',
    //     descripcion: 'Descripción del evento 1',
    //     fecha: new Date().toISOString(),
    //     precio: 100,
    //   },
    //   {
    //     id: 2,
    //     titulo: 'Evento 2',
    //     descripcion: 'Descripción del evento 2',
    //     fecha: new Date().toISOString(),
    //     precio: 200,
    //   },
    // ]);

    return this.http.get<Evento[]>('http://localhost:8080/Event');
  }
}
