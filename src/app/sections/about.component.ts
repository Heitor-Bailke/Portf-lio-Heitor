import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "../components/icon.component";
import { RevealDirective } from "../directives/reveal.directive";
@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule, IconComponent, RevealDirective],
  template: ` <section id="sobre" class="section">
    <div class="container about-layout">
      <div appReveal>
        <p class="eyebrow">01 / QUEM ESTÁ POR TRÁS DO CÓDIGO</p>
        <h2>
          Uma nova carreira.<br /><span class="muted"
            >A mesma vontade<br />de construir.</span
          >
        </h2>
        <div class="about-signature">
          <span class="signature-mark">HB</span
          ><span
            >Heitor Bailke<small
              >Desenvolvedor Back-end & Front-end</small
            ></span
          >
        </div>
      </div>
      <div appReveal>
        <p class="lead">
          Transformar problemas em soluções sempre fez parte da minha
          trajetória. Hoje, faço isso também com código.
        </p>
        <p>
          Minha experiência com clientes, sistemas corporativos e processos
          desenvolveu minha comunicação, organização e responsabilidade. Essa
          bagagem acompanha minha transição para o desenvolvimento de software.
        </p>
        <p>
          Curso Análise e Desenvolvimento de Sistemas na UVV e construo
          aplicações conectando <strong>Java + Spring Boot</strong> no back-end
          e <strong>Angular + React</strong> no front-end. Busco minha primeira
          oportunidade como desenvolvedor para contribuir, aprender e evoluir
          com uma equipe.
        </p>
      </div>
    </div>
    <div class="container about-facts">
      <article class="glass fact-card" *ngFor="let fact of facts" appReveal>
        <app-icon [name]="fact.icon" />
        <div>
          <span>{{ fact.label }}</span>
          <h3>{{ fact.value }}</h3>
        </div>
      </article>
    </div>
  </section>`,
})
export class AboutComponent {
  readonly facts = [
    {
      icon: "book",
      label: "Formação",
      value: "Análise e Desenvolvimento de Sistemas",
    },
    {
      icon: "code",
      label: "Áreas de interesse",
      value: "Back-end & Front-end",
    },
    { icon: "java", label: "Back-end principal", value: "Java + Spring Boot" },
    { icon: "react", label: "Front-end principal", value: "Angular + React" },
    { icon: "database", label: "Banco principal", value: "PostgreSQL" },
    {
      icon: "briefcase",
      label: "Objetivo",
      value: "Primeira oportunidade como dev Júnior",
    },
  ];
}
