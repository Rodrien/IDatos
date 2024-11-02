import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import * as L from "leaflet";
import { EventosService } from "src/app/services/eventos/eventos.service";
import { EventCategory, Evento } from "src/app/models/evento";

// Fix for missing marker images
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-map",
  standalone: true,
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  private map: L.Map | undefined;
  private eventosService: EventosService = inject(EventosService);
  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.loadEventLocations();
    }
  }

  private initMap(): void {
    this.map = L.map("map").setView([-34.9011, -56.1645], 12); // Centered on Montevideo, Uruguay

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 20,
      minZoom: 4,
      bounds: [
        [-35.0, -58.0], // Southwest coordinates of Uruguay
        [-30.0, -53.0], // Northeast coordinates of Uruguay
      ],
    }).addTo(this.map);

    const defaultIcon = L.icon({
      iconUrl: "assets/marker-icon.png",
      shadowUrl: "assets/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;
  }

  private loadEventLocations(): void {
    this.eventosService.getEventosTest().subscribe((eventos: Evento[]) => {
      eventos.forEach((evento) => {
        if (evento.latitud && evento.longitud) {
          L.marker([parseFloat(evento.latitud), parseFloat(evento.longitud)])
            .addTo(this.map!)
            .bindPopup(`<b>${evento.name}</b><br>${evento.description}`);
          const popupContent = `
            <div style="font-size: 14px; margin: 0">
              <img src="${evento.imageUrl}" alt="${
                evento.name
              }" style="width: 100%; height: auto; border-radius: 8px;"/>
              <h6>${evento.name}
              </h6><span style:"margin-left: 16px">${this.formatCategories(evento.categories)}</span>
              <p style="margin: 4px">${evento.description}</p>
              <p style="margin: 4px">${evento.location} - Fecha: ${this.formatDates(
                evento.dates
              )}</p>
              <p style="margin: 4px">${evento.currency} ${evento.price}</p>
              <a href="${evento.url}" target="_blank">Details</a>
            </div>
            `;
          L.marker([parseFloat(evento.latitud), parseFloat(evento.longitud)])
            .addTo(this.map!)
            .bindPopup(popupContent);
        }
      });
    });
  }

  formatDates(dates: string[]): string {
    return this.eventosService.formatDates(dates);
  }

  formatCategories(categories: EventCategory[]): string {
    return categories.map((category) => category.name).join(", ");
  }
}
