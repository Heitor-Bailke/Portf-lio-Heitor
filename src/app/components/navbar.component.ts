import { Component, OnInit, OnDestroy, NgZone, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { IconComponent } from "./icon.component";
import { ThemeService } from "../services/theme.service";
import { PROFILE } from "../data/profile";
@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: ` <header
    class="navbar"
    [class.scrolled]="scrolled"
    (keydown.escape)="closeMenu(true)"
  >
    <div class="container nav-inner">
      <a
        class="brand"
        routerLink="/"
        fragment="inicio"
        (click)="closeMenu()"
        aria-label="Heitor Bailke — início"
        ><span class="brand-bracket">&lt;</span>HB<span class="brand-bracket">
          /&gt;</span
        ><span class="brand-name">heitor<span>.dev</span></span></a
      >
      <nav class="desktop-nav" aria-label="Navegação principal">
        <a
          *ngFor="let item of links"
          routerLink="/"
          [fragment]="item.id"
          [class.active]="activeId === item.id"
          [attr.aria-current]="activeId === item.id ? 'location' : null"
          >{{ item.label }}</a
        >
      </nav>
      <div class="nav-actions">
        <button
          class="theme-toggle"
          type="button"
          (click)="theme.toggle()"
          [attr.aria-pressed]="theme.dark()"
          aria-label="Modo escuro"
          [attr.title]="theme.dark() ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <app-icon [name]="theme.dark() ? 'sun' : 'moon'" /></button
        ><a
          class="button secondary small nav-resume"
          [href]="profile.resumeUrl"
          download
          >Currículo <app-icon name="download" /></a
        ><button
          id="menu-toggle"
          class="menu-toggle"
          (click)="menuOpen = !menuOpen"
          [attr.aria-expanded]="menuOpen"
          aria-controls="mobile-navigation"
          [attr.aria-label]="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        >
          <app-icon [name]="menuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
    <nav
      id="mobile-navigation"
      class="mobile-nav"
      [hidden]="!menuOpen"
      aria-label="Navegação mobile"
    >
      <a
        *ngFor="let item of links"
        routerLink="/"
        [fragment]="item.id"
        (click)="closeMenu()"
        [class.active]="activeId === item.id"
        [attr.aria-current]="activeId === item.id ? 'location' : null"
        >{{ item.label }} <span>↗</span></a
      ><a [href]="profile.resumeUrl" download>Baixar currículo ↓</a>
    </nav>
    <div class="reading-progress" aria-hidden="true"></div>
  </header>`,
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly profile = PROFILE;
  readonly theme = inject(ThemeService);
  readonly links = [
    { id: "inicio", label: "Início" },
    { id: "sobre", label: "Sobre" },
    { id: "stack", label: "Tecnologias" },
    { id: "projetos", label: "Projetos" },
    { id: "experiencia", label: "Experiência" },
    { id: "contato", label: "Contato" },
  ];
  menuOpen = false;
  activeId = "inicio";
  scrolled = false;
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);
  private subscription?: Subscription;
  private frame = 0;
  private readonly onScroll = () => {
    if (!this.frame)
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        this.update();
      });
  };
  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener("scroll", this.onScroll, { passive: true });
      window.addEventListener("resize", this.onScroll, { passive: true });
      this.onScroll();
    });
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
        this.onScroll();
      }
    });
  }
  private update(): void {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? Math.min(1, window.scrollY / height) : 0;
    const bar = document.querySelector<HTMLElement>(".reading-progress");
    if (bar) bar.style.transform = "scaleX(" + progress + ")";
    let active = "";
    for (const item of this.links) {
      const section = document.getElementById(item.id);
      if (
        section &&
        section.getBoundingClientRect().top < window.innerHeight * 0.35
      )
        active = item.id;
    }
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8 &&
      document.getElementById("contato")
    )
      active = "contato";
    const scrolled = window.scrollY > 20;
    if (active !== this.activeId || scrolled !== this.scrolled)
      this.zone.run(() => {
        this.activeId = active;
        this.scrolled = scrolled;
      });
  }
  closeMenu(focus = false): void {
    this.menuOpen = false;
    if (focus) document.getElementById("menu-toggle")?.focus();
  }
  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onScroll);
    cancelAnimationFrame(this.frame);
    this.subscription?.unsubscribe();
  }
}
