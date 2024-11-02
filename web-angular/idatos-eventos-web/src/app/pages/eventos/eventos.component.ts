import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { EventCategory, Evento } from "src/app/models/evento";
import { EventosService } from "src/app/services/eventos/eventos.service";
import { EventoItemComponent } from "./components/evento-item/evento-item.component";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-eventos",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    EventoItemComponent,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: "./eventos.component.html",
  styleUrl: "./eventos.component.css",
})
export class EventosComponent implements OnInit {
  // Eventos Service
  eventosService = inject(EventosService);
  // Eventos List
  public eventos?: Evento[];
  public categorySelected = "None";
  public displayCategories: Set<string> = new Set();
  @ViewChild("searchtext") searchtext!: HTMLInputElement;

  constructor() {}

  ngOnInit() {
    this.getEventos();
  }

  getEventos(params?: { text: string; category: string }) {
    this.eventosService.getEventos(params).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        if (this.displayCategories.size == 0) this.getCategories();
        this.getEventosAddresses();
      },
      error: (err) => console.log("Error al obtener los eventos :: ", err),
    });
  }

  getCategories() {
    if (!this.eventos) return;

    this.displayCategories = new Set();
    for (const e of this.eventos) {
      for (const c of e.categories) {
        this.displayCategories.add(c.name);
      }
    }
  }

  async getEventosAddresses() {
    if (!this.eventos) return;

    for (const e of this.eventos) {
      if (
        !this.eventosService.eventLocationIsValid(e) &&
        e.latitud &&
        e.longitud
      ) {
        try {
          e.location = await this.eventosService.getAddress(
            parseFloat(e.latitud),
            parseFloat(e.longitud)
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
    this.getEventos({ text, category: this.categorySelected });
  }

  onSearchCategory() {
    console.log("searching for category :: ", this.categorySelected);
    const category =
      this.categorySelected === "None" ? "" : this.categorySelected;
    this.getEventos({
      text: this.searchtext.value,
      category,
    });
  }
}
