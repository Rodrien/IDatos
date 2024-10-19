import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { get } from 'http';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos/eventos.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
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
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
