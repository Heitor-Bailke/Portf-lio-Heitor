import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IconComponent } from "./icon.component";
import { PROFILE_TECHNOLOGIES } from "../data/technologies";

@Component({
  selector: "app-profile-card",
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="profile-visual">
      <div class="specimen-header" aria-hidden="true">
        <span>PERFIL / 001</span><span>BR-ES</span>
      </div>
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
      <div class="specimen-meta">
        <span><small>BASE</small>Colatina, ES</span>
        <span><small>FOCO</small>Sistemas web</span>
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
export class ProfileCardComponent {
  readonly technologies = PROFILE_TECHNOLOGIES;
}
