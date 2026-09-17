import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "../components/icon.component";
import { RevealDirective } from "../directives/reveal.directive";
@Component({
  selector: "app-engineering",
  standalone: true,
  imports: [CommonModule, IconComponent, RevealDirective],
  template: ` <section id="arquitetura" class="section section-tint">
      <div class="container engineering-grid">
        <div appReveal>
          <p class="eyebrow">04 / POR TRÁS DA INTERFACE</p>
          <span class="section-icon"><app-icon name="terminal" /></span>
          <h2>Construindo<br />o <span class="accent">Back-end.</span></h2>
          <p>
            Uma API vai além dos endpoints. Ela organiza regras, protege dados e
            conecta sistemas com responsabilidades claras.
          </p>
          <div class="engineering-features">
            <span *ngFor="let item of backendFeatures"
              ><app-icon name="check" />{{ item }}</span
            >
          </div>
          <p class="section-note">
            Referência de arquitetura Java/Spring. As implementações de cada
            projeto estão documentadas nos cases.
          </p>
        </div>
        <div class="architecture-panel glass" appReveal>
          <div class="panel-heading">
            <span><i></i> REQUEST LIFECYCLE</span><span>JAVA / SPRING</span>
          </div>
          <ol class="backend-flow">
            <li
              *ngFor="let layer of backendLayers; let i = index"
              [style.--step]="i"
            >
              <span class="flow-number">0{{ i + 1 }}</span
              ><app-icon [name]="layer.icon" />
              <div>
                <strong>{{ layer.name }}</strong
                ><small>{{ layer.description }}</small>
              </div>
              <span class="flow-indicator" aria-hidden="true"></span>
            </li>
          </ol>
          <p class="flow-note">
            DTOs e mappers apoiam as camadas na transformação dos dados.
          </p>
          <div class="response-status">
            <span class="status-dot"></span> Responsabilidades separadas.
            Evolução organizada.
          </div>
        </div>
      </div>
    </section>
    <section id="frontend" class="section">
      <div class="container engineering-grid frontend-grid">
        <div class="frontend-panel glass" appReveal>
          <div class="panel-heading">
            <span><i></i> USER EXPERIENCE</span><span>ANGULAR / REACT</span>
          </div>
          <div class="interface-preview" aria-hidden="true">
            <div class="mini-sidebar"><i></i><i></i><i></i><i></i></div>
            <div class="mini-content">
              <div class="mini-toolbar"><span></span><i></i></div>
              <div class="mini-cards">
                <span></span><span></span><span></span>
              </div>
              <div class="mini-chart">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
            </div>
            <span class="preview-label">COMPONENT-BASED UI</span>
          </div>
          <ol class="frontend-flow">
            <li
              *ngFor="let layer of frontendLayers; let i = index"
              [style.--step]="i"
            >
              <app-icon [name]="layer.icon" /><span>{{ layer.name }}</span>
            </li>
          </ol>
          <div class="response-status">
            <span class="status-dot"></span> Interface → componentes → serviços
            → API → back-end
          </div>
        </div>
        <div appReveal>
          <p class="eyebrow">05 / CADA INTERAÇÃO IMPORTA</p>
          <span class="section-icon"><app-icon name="screen" /></span>
          <h2>
            Construindo experiências<br />no
            <span class="accent">Front-end.</span>
          </h2>
          <p>
            Interfaces que fazem sentido para quem usa. Componentes
            reutilizáveis, estados bem definidos e atenção aos detalhes, em
            qualquer tela.
          </p>
          <div class="engineering-features">
            <span *ngFor="let item of frontendFeatures"
              ><app-icon name="check" />{{ item }}</span
            >
          </div>
          <div class="frontend-tech">
            <span><app-icon name="angular" /> Angular</span
            ><span><app-icon name="react" /> React</span
            ><span><app-icon name="grid" /> CSS Grid & Flexbox</span>
          </div>
        </div>
      </div>
    </section>`,
})
export class EngineeringComponent {
  readonly backendFeatures = [
    "APIs REST",
    "Spring Security & JWT",
    "Autenticação e autorização",
    "Validação de requisições",
    "Tratamento de exceções",
    "JPA / Hibernate",
  ];
  readonly frontendFeatures = [
    "Componentes reutilizáveis",
    "Consumo de APIs REST",
    "Design responsivo & UX/UI",
    "Estados de loading e erro",
    "Formulários e validações",
    "Dashboards e visualização",
  ];
  readonly backendLayers = [
    {
      name: "Controller",
      description: "Recebe e responde às requisições",
      icon: "code",
    },
    {
      name: "Service / Business",
      description: "Concentra as regras de negócio",
      icon: "layers",
    },
    {
      name: "DTO",
      description: "Define os contratos de entrada e saída",
      icon: "code",
    },
    {
      name: "Mapper",
      description: "Transforma DTOs e entidades",
      icon: "layers",
    },
    {
      name: "Repository",
      description: "Abstrai o acesso aos dados",
      icon: "database",
    },
    {
      name: "PostgreSQL",
      description: "Persiste os dados da aplicação",
      icon: "database",
    },
  ];
  readonly frontendLayers = [
    { name: "Interface", icon: "screen" },
    { name: "Components", icon: "grid" },
    { name: "Services", icon: "layers" },
    { name: "API REST", icon: "code" },
    { name: "Back-end", icon: "terminal" },
  ];
}
