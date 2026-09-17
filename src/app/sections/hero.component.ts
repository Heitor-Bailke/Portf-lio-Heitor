import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconComponent } from "../components/icon.component";
import { OrbitComponent } from "../components/orbit.component";
import { PROFILE } from "../data/profile";
@Component({
  selector: "app-hero",
  standalone: true,
  imports: [RouterLink, IconComponent, OrbitComponent],
  template: ` <section id="inicio" class="hero">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="container hero-layout">
        <div class="hero-copy">
          <div class="availability">
            <span class="status-dot"></span> DISPONÍVEL PARA NOVAS OPORTUNIDADES
          </div>
          <p class="hero-greeting">Olá, eu sou</p>
          <h1>
            Heitor <span>Bailke<span class="heading-dot">.</span></span>
          </h1>
          <h2 class="hero-role">
            Desenvolvedor
            <strong
              ><span class="role-term">Back-end</span
              ><br class="desktop-break" />
              & <span class="role-term">Front-end</span></strong
            >
            Júnior
          </h2>
          <p class="hero-description">
            Desenvolvo aplicações web unindo interfaces modernas e responsivas
            com APIs seguras, arquitetura organizada e integração com bancos de
            dados.
          </p>
          <p class="hero-stack">
            Java <b>·</b> Spring Boot <b>·</b> Angular <b>·</b> React
            <b>·</b> PostgreSQL
          </p>
          <div class="actions hero-actions">
            <a class="button" routerLink="/" fragment="projetos"
              >Ver projetos <app-icon name="arrow" /></a
            ><a class="button secondary" [href]="profile.resumeUrl" download
              >Baixar currículo <app-icon name="download"
            /></a>
          </div>
          <div class="hero-socials">
            <a [href]="profile.github" target="_blank" rel="noopener noreferrer"
              ><app-icon name="github" /> GitHub <span>↗</span></a
            ><a
              [href]="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              ><app-icon name="linkedin" /> LinkedIn <span>↗</span></a
            ><span class="hero-location"
              ><app-icon name="location" /> Vila Velha, ES</span
            >
          </div>
        </div>
        <app-orbit />
      </div>
      <div class="container hero-bottom">
        <span
          ><i></i> Aberto a oportunidades como Desenvolvedor Back-end ou
          Front-end Júnior</span
        ><a routerLink="/" fragment="sobre"
          >Explore o portfólio <span>↓</span></a
        >
      </div>
    </section>
    <div class="capability-strip">
      <div class="container">
        <span><app-icon name="terminal" /> Back-end com propósito</span
        ><span><app-icon name="screen" /> Front-end com experiência</span
        ><span><app-icon name="layers" /> Integração de ponta a ponta</span>
      </div>
    </div>`,
})
export class HeroComponent {
  readonly profile = PROFILE;
}
