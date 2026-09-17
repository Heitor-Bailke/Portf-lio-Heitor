import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconComponent } from "./icon.component";
import { PROFILE } from "../data/profile";
@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `<footer class="footer">
    <div class="container footer-inner">
      <div>
        <a class="footer-name" routerLink="/" fragment="inicio"
          >Heitor Bailke<span>.</span></a
        >
        <p>Desenvolvedor Back-end & Front-end Júnior</p>
      </div>
      <div class="footer-links">
        <a
          [href]="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub de Heitor"
          ><app-icon name="github" /></a
        ><a
          [href]="profile.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn de Heitor"
          ><app-icon name="linkedin" /></a
        ><a routerLink="/" fragment="inicio" aria-label="Voltar ao início">↑</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© {{ year }} Heitor Bailke. Feito com atenção aos detalhes.</span
      ><span
        >Desenvolvido com Angular & TypeScript
        <span class="footer-code">&lt;/&gt;</span></span
      >
    </div>
  </footer>`,
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
