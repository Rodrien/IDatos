import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { get } from 'http';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatGridListModule, MatCardModule , MatListModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventosComponent {
  // Eventos Service
  private eventosService = inject(EventosService);
  // Eventos List
  public eventos?: Evento[];

  constructor() {
    this.getEventos();
  }

  getEventos() {
    this.eventosService.getEventos().subscribe({
      next: (res) => {
        console.log("Eventos totales cargados :: ", res);
        this.eventos = res.slice(0, 20);
        console.log("Eventos a utilizar :: ", this.eventos);
      },
      error: (err) => console.log("Error al obtener los eventos :: ", err)
    });
  }


  getNombresCategoriasEvento(evento: Evento) {
    return evento.categories.map(c => c.name);
  }

  descripcionEventoIsValid(evento: Evento) {
    if (evento.description.includes("Lo sentimos"))
      return false;

    return true;
  }
}
