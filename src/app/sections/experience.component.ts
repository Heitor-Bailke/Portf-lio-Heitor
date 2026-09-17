import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "../components/icon.component";
import { RevealDirective } from "../directives/reveal.directive";
import { EXPERIENCE } from "../data/experience";
@Component({
  selector: "app-experience",
  standalone: true,
  imports: [CommonModule, IconComponent, RevealDirective],
  template: ` <section id="experiencia" class="section section-tint">
    <div class="container">
      <div class="section-heading" appReveal>
        <div>
          <p class="eyebrow">07 / TRAJETÓRIA</p>
          <h2>
            Experiências que<br /><span class="muted"
              >também constroem um dev.</span
            >
          </h2>
        </div>
        <p>
          Comunicação, organização e resolução de problemas.<br />Uma bagagem
          que levo para o desenvolvimento.
        </p>
      </div>
      <div class="journey-layout">
        <div class="timeline">
          <article
            class="timeline-item"
            *ngFor="let item of experience"
            appReveal
          >
            <span class="timeline-marker"><app-icon [name]="item.icon" /></span>
            <div class="timeline-meta">
              <span>{{ item.period }}</span
              ><span class="timeline-line"></span>
            </div>
            <h3>{{ item.company }}</h3>
            <p class="timeline-role">{{ item.role }}</p>
            <p>{{ item.description }}</p>
            <div class="tags">
              <span *ngFor="let skill of item.skills">{{ skill }}</span>
            </div>
          </article>
        </div>
        <aside id="formacao" class="education-card glass" appReveal>
          <span class="education-icon"><app-icon name="book" /></span>
          <p class="eyebrow">FORMAÇÃO ACADÊMICA</p>
          <h3>Análise e Desenvolvimento de Sistemas</h3>
          <p>Universidade Vila Velha — UVV</p>
          <div class="education-date">
            <span class="status-dot"></span> Em andamento <strong>2026</strong>
          </div>
          <p class="education-note">
            Conclusão prevista para dezembro de 2026. Formação conectada à
            prática em projetos Back-end e Front-end.
          </p>
          <div class="education-tags">
            <span>Java + Spring Boot</span><span>Angular + React</span
            ><span>Banco de dados</span>
          </div>
        </aside>
      </div>
    </div>
  </section>`,
})
export class ExperienceComponent {
  readonly experience = EXPERIENCE;
}
