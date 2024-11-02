import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./pages/eventos/eventos.component").then(
        (m) => m.EventosComponent
      ),
  },
  {
    path: "evento/:id",
    loadComponent: () =>
      import("./pages/evento-detail/evento-detail.component").then(
        (m) => m.EventoDetailComponent
      ),
  },
  {
    path: "map",
    loadComponent: () =>
      import("./pages/map/map.component").then((m) => m.MapComponent),
  },
  // Wildcard route to handle unknown routes
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full",
  },
];
