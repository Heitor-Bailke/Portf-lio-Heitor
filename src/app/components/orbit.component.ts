import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon.component";
import { ORBIT_TECHNOLOGIES } from "../data/technologies";

@Component({
  selector: "app-orbit",
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="profile-visual">
      <div class="profile-photo">
        <img
          src="assets/projects/Foto-Heitor-Principal.jpg"
          alt="Heitor Bailke"
          width="1080"
          height="1080"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <ul class="profile-technologies" aria-label="Tecnologias que utilizo">
        <li *ngFor="let tech of technologies" [attr.title]="tech.name">
          <app-icon [name]="tech.icon" aria-hidden="true" />
          <span class="sr-only">{{ tech.name }}</span>
        </li>
      </ul>
    </div>
  `,
})
export class OrbitComponent {
  readonly technologies = ORBIT_TECHNOLOGIES;
}
