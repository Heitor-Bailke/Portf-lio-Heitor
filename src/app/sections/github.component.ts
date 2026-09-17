import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "../components/icon.component";
import { RevealDirective } from "../directives/reveal.directive";
import { PROFILE } from "../data/profile";
import { ALL_PROJECTS } from "../data/projects";
@Component({
  selector: "app-github",
  standalone: true,
  imports: [CommonModule, IconComponent, RevealDirective],
  template: ` <section class="section github-section">
    <div class="container github-layout">
      <div appReveal>
        <p class="eyebrow">08 / OPEN SOURCE & EVOLUÇÃO</p>
        <app-icon class="github-large" name="github" />
        <h2>
          Mais do que commits.<br /><span class="accent"
            >Um processo de evolução.</span
          >
        </h2>
        <p>
          Os repositórios mostram como organizo ideias e construo soluções.
          Explore o código, as tecnologias e os próximos passos.
        </p>
        <a
          class="button secondary"
          [href]="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          >Explorar meu GitHub <app-icon name="external"
        /></a>
      </div>
      <div class="repo-list" appReveal>
        <a
          class="repo-card glass"
          *ngFor="let repo of repos"
          [href]="repo.github"
          target="_blank"
          rel="noopener noreferrer"
          ><div>
            <app-icon name="github" /><strong>{{ repo.title }}</strong
            ><app-icon name="external" />
          </div>
          <p>{{ repo.summary }}</p>
          <span class="repo-language"
            ><i></i>{{ repo.technologies.slice(0, 3).join(" · ") }}</span
          ></a
        >
      </div>
    </div>
  </section>`,
})
export class GithubComponent {
  readonly profile = PROFILE;
  readonly repos = ALL_PROJECTS.filter((p) =>
    ["hb-finance", "api-de-usuarios", "clinica-animale"].includes(p.slug),
  );
}
