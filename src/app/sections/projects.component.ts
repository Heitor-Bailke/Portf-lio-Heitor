import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectCardComponent } from "../components/project-card.component";
import { RevealDirective } from "../directives/reveal.directive";
import { ALL_PROJECTS } from "../data/projects";
@Component({
  selector: "app-projects",
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    RevealDirective,
  ],
  template: ` <section id="projetos" class="section">
    <div class="container">
      <div class="section-heading" appReveal>
        <div>
          <p class="eyebrow">03 / IDEIAS QUE VIRARAM CÓDIGO</p>
          <h2>Projetos em <span class="accent">destaque.</span></h2>
        </div>
        <p>
          Interfaces, APIs e tudo que conecta os dois.<br />Explore o contexto
          por trás de cada solução.
        </p>
      </div>
      <div class="project-filter-row">
        <div
          class="filters"
          role="group"
          aria-label="Filtrar projetos por área"
        >
          <button
            *ngFor="let filter of filters"
            type="button"
            [class.active]="activeFilter === filter.value"
            [attr.aria-pressed]="activeFilter === filter.value"
            (click)="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
        <span class="filter-count" aria-live="polite"
          >{{ filteredProjects.length }}
          {{ filteredProjects.length === 1 ? "projeto" : "projetos" }}</span
        >
      </div>
      <div class="project-grid">
        <app-project-card
          *ngFor="let project of filteredProjects; trackBy: trackProject"
          [project]="project"
          appReveal
        />
      </div>
    </div>
  </section>`,
})
export class ProjectsComponent {
  readonly filters = [
    { label: "Todos", value: "all" },
    { label: "Back-end", value: "BACK-END" },
    { label: "Front-end", value: "FRONT-END" },
    { label: "Full Stack", value: "FULL STACK" },
  ];
  activeFilter = "all";
  get filteredProjects() {
    return ALL_PROJECTS.filter(
      (p) =>
        (this.activeFilter === "all" || p.kind === this.activeFilter),
    );
  }
  trackProject(_index: number, project: { slug: string }): string {
    return project.slug;
  }
}
