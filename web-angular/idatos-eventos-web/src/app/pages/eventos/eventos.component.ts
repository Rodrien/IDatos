import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Evento } from "src/app/models/evento";
import { EventosService } from "src/app/services/eventos/eventos.service";
import { EventoItemComponent } from "./components/evento-item/evento-item.component";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { lastValueFrom } from "rxjs";

@Component({
  selector: "app-eventos",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    EventoItemComponent,
    MatChipsModule,
  ],
  templateUrl: "./eventos.component.html",
  styleUrl: "./eventos.component.css",
})
export class EventosComponent {
  // Eventos Service
  eventosService = inject(EventosService);
  // Eventos List
  public eventos?: Evento[];

  constructor() {
    this.getEventos();
  }

  getEventos() {
    this.eventosService.getEventos().subscribe({
      next: async (eventos) => {
        this.eventos = eventos;

        for (const e of this.eventos) {
          if (!this.eventosService.eventLocationIsValid(e))
            e.location = await this.eventosService.getAddress(parseFloat(e.longitud), parseFloat(e.latitud));
        }
        
        console.log("eventos api works ::", eventos);
      },
      error: (err) => console.log("Error al obtener los eventos :: ", err),
    });
  }

  formatDates(dates: string[]): string {
    return this.eventosService.formatDates(dates);
  }

}
