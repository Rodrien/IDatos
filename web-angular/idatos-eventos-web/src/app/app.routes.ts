import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/eventos/eventos.component').then(
        (m) => m.EventosComponent
      ),
    children: [
      {
        path: 'evento/:id',
        loadComponent: () =>
          import('./pages/evento-detail/evento-detail.component').then(
            (m) => m.EventoDetailComponent
          ),
      },
    ],
  },
];
