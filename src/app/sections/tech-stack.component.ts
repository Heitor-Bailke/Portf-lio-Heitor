import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "../components/icon.component";
import { RevealDirective } from "../directives/reveal.directive";
import { TECHNOLOGIES } from "../data/technologies";
@Component({
  selector: "app-tech-stack",
  standalone: true,
  imports: [CommonModule, IconComponent, RevealDirective],
  template: ` <section id="stack" class="section section-tint">
    <div class="container">
      <div class="section-heading" appReveal>
        <div>
          <p class="eyebrow">02 / MEU ECOSSISTEMA</p>
          <h2>Tecnologias que <span class="accent">utilizo.</span></h2>
        </div>
        <p>
          Da estrutura da API ao último detalhe da interface.<br />Ferramentas
          para construir soluções completas.
        </p>
      </div>
      <div class="stack-grid">
        <article
          class="glass stack-card"
          *ngFor="let group of groups"
          appReveal
        >
          <div class="stack-heading">
            <span class="icon-box"><app-icon [name]="group.icon" /></span>
            <h3>{{ group.title }}</h3>
          </div>
          <p>{{ group.description }}</p>
          <ul class="technology-list">
            <li *ngFor="let tech of group.items">
              <app-icon [name]="tech.icon" /><span>{{ tech.name }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>`,
})
export class TechStackComponent {
  readonly groups = TECHNOLOGIES;
}
