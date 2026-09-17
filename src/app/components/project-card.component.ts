import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IconComponent } from "./icon.component";
import { ProjectCase } from "../data/projects";
@Component({
  selector: "app-project-card",
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: ` <article class="project-card glass">
    <a
      class="project-cover"
      [routerLink]="['/projetos', project.slug]"
      [attr.aria-label]="'Ver detalhes: ' + project.title"
    >
      <img
        *ngIf="project.image; else technicalCover"
        [src]="project.image"
        [alt]="'Interface do projeto ' + project.title"
        width="640"
        height="400"
        loading="lazy"
        decoding="async"
      />
      <ng-template #technicalCover
        ><div class="technical-cover">
          <app-icon
            [name]="project.kind === 'BACK-END' ? 'terminal' : 'layers'"
          /><span>{{
            project.kind === "BACK-END"
              ? "java / spring boot"
              : "catalog / orders / users"
          }}</span
          ><strong>{{
            project.status === "Planejado"
              ? "Próximo capítulo."
              : "Da estrutura à API."
          }}</strong
          ><small>{{ project.status }}</small>
        </div></ng-template
      >
      <span class="cover-arrow"><app-icon name="external" /></span>
    </a>
    <div class="project-card-body">
      <div class="project-meta">
        <span>{{ project.kind }}</span
        ><small>{{ project.status }}</small>
      </div>
      <h3>
        <a [routerLink]="['/projetos', project.slug]">{{ project.title }}</a>
      </h3>
      <p>{{ project.summary }}</p>
      <div class="tags">
        <span *ngFor="let tech of project.technologies">{{ tech }}</span>
      </div>
      <div class="project-links">
        <a [routerLink]="['/projetos', project.slug]"
          >Detalhes <app-icon name="arrow" /></a
        ><a
          *ngIf="project.github"
          [href]="project.github"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="'GitHub: ' + project.title"
          ><app-icon name="github" /> Código</a
        ><a
          *ngIf="project.demo"
          [href]="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="'Demonstração: ' + project.title"
          >Demo <app-icon name="external"
        /></a>
      </div>
    </div>
  </article>`,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: ProjectCase;
}
