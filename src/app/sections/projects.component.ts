import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IconComponent } from "../components/icon.component";
import { ProjectCardComponent } from "../components/project-card.component";
import { RevealDirective } from "../directives/reveal.directive";
import { ALL_PROJECTS } from "../data/projects";
@Component({
  selector: "app-projects",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IconComponent,
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
      <article class="featured-project glass" appReveal>
        <div class="featured-copy">
          <span class="featured-label"
            ><span class="status-dot"></span> PROJETO PRINCIPAL
            <span>/ FULL STACK</span></span
          >
          <h3>HB Finance<span>.</span></h3>
          <p>
            Clareza para as finanças.<br />Uma aplicação completa, da interface
            à API.
          </p>
          <p class="feature-context">
            Receitas, despesas, categorias e acompanhamento mensal em um
            dashboard responsivo, com gráficos e histórico de movimentações.
          </p>
          <ul class="feature-checks">
            <li><app-icon name="check" /> Dashboard e visualização de dados</li>
            <li><app-icon name="check" /> Autenticação JWT e refresh token</li>
            <li>
              <app-icon name="check" /> Integração entre front-end e back-end
            </li>
          </ul>
          <div class="tags">
            <span *ngFor="let tech of featured.technologies">{{ tech }}</span>
          </div>
          <div class="actions">
            <a class="button" [routerLink]="['/projetos', featured.slug]"
              >Ver estudo de caso <app-icon name="arrow" /></a
            ><a
              class="text-link"
              [href]="featured.github"
              target="_blank"
              rel="noopener noreferrer"
              ><app-icon name="github" /> GitHub</a
            >
          </div>
        </div>
        <a
          class="featured-visual"
          [routerLink]="['/projetos', featured.slug]"
          aria-label="Abrir estudo de caso do HB Finance"
          ><div class="browser-bar">
            <span>● ● ●</span><span>HB Finance / Dashboard</span
            ><app-icon name="external" />
          </div>
          <img
            [src]="featured.image"
            alt="Dashboard do HB Finance com resumo mensal, saldo, despesas e gráficos"
            width="1440"
            height="1020"
            loading="lazy"
            decoding="async"
          /><span class="screenshot-caption"
            >Interface real · dados fictícios para demonstração</span
          ></a
        >
      </article>
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
  readonly featured = ALL_PROJECTS[0];
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
        p.slug !== "hb-finance" &&
        (this.activeFilter === "all" || p.kind === this.activeFilter),
    );
  }
  trackProject(_index: number, project: { slug: string }): string {
    return project.slug;
  }
}
