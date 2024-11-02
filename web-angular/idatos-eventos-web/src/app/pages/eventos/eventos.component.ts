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

  getEventos(params?: { text: string; category: string }) {
    this.eventosService.getEventos(params).subscribe({
      next: async (eventos) => {
        this.eventos = eventos;

        this.getEventosAddresses();
      },
      error: (err) => console.log("Error al obtener los eventos :: ", err),
    });
  }

  async getEventosAddresses() {
    // this.eventos?.forEach(async (evento) => {
    //   if (evento.latitud && evento.longitud) {
    //     const address = await this.eventosService.getAddress(
    //       parseFloat(evento.latitud),
    //       parseFloat(evento.longitud)
    //     );
    //     evento.location = address;
    //   }
    // });

    for (const e of this.eventos!) {
      if (!this.eventosService.eventLocationIsValid(e))
        if (e.latitud && e.longitud) {
          try {
            e.location = await this.eventosService.getAddress(
              parseFloat(e.longitud),
              parseFloat(e.latitud)
            );
          } catch (error) {
            console.error("Error fetching address:", error);
            e.location = "";
          }
        }
    }
  }

  formatDates(dates: string[]): string {
    return this.eventosService.formatDates(dates);
  }

  onSearchInput(text: string) {
    console.log("searching for :: ", text);
    this.getEventos({ text, category: "" });
  }
}
