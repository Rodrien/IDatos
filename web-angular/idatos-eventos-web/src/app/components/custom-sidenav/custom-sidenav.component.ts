import { CommonModule } from "@angular/common";
import { Component, computed, Input, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterModule, RouterOutlet } from "@angular/router";

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: "app-custom-sidenav",
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterModule,
  ],
  template: `
    <div class="sidenav-header">
      <img
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src="assets/sidenav-img.png"
        alt="logo"
      />
      <div class="header-text" [class.hide-header-text]="menuCollapsed()">
        <h2>Eventos</h2>
        <p>IDatos</p>
      </div>
    </div>
    <mat-nav-list>
      <a
        *ngFor="let item of menuItems()"
        mat-list-item
        routerLinkActive="selected-menu-item"
        #rla="routerLinkActive"
        [activated]="rla.isActive"
        [routerLink]="item.route"
      >
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        @if (!menuCollapsed()) {
        <span matListItemTitle>{{ item.label }}</span>
        }
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
      :host * {
        transition: all 0.3s ease-in-out;
      }

      .sidenav-header {
        padding-top: 24px;
        text-align: center;
        > img {
          border-radius: 10%;
          object-fit: cover;
          margin-bottom: 16px;
        }
      }

      .header-text {
        height: 3em;
        > h2 {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.5rem;
        }

        > p {
          margin: 0;
          font-size: 1rem;
        }
      }

      .hide-header-text {
        opacity: 0;
        height: 0;
      }

      .selected-menu-item {
        border-left: 4px solid #3f51b5;
      }
    `,
  ],
})
export class CustomSidenavComponent {
  menuCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.menuCollapsed.set(value);
  }

  menuItems = signal<MenuItem[]>([
    { icon: "home", label: "Inicio", route: "/home" },
    { icon: "map", label: "Mapa", route: "/map" },
  ]);

  profilePicSize = computed(() => (this.menuCollapsed() ? "32" : "100"));
}
