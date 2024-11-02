import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    CustomSidenavComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Integracion de Datos";
  menuCollapsed = signal(false);
  sideNavWidth = computed(() => (this.menuCollapsed() ? "65px" : "250px"));

  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.menuCollapsed.set(!this.menuCollapsed());
  }
}
