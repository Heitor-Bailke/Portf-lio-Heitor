import { Component } from "@angular/core";
import { HeroComponent } from "./sections/hero.component";
import { AboutComponent } from "./sections/about.component";
import { TechStackComponent } from "./sections/tech-stack.component";
import { ProjectsComponent } from "./sections/projects.component";
import { EngineeringComponent } from "./sections/engineering.component";
import { CodeComponent } from "./sections/code.component";
import { ExperienceComponent } from "./sections/experience.component";
import { GithubComponent } from "./sections/github.component";
import { ContactComponent } from "./sections/contact.component";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    TechStackComponent,
    ProjectsComponent,
    EngineeringComponent,
    CodeComponent,
    ExperienceComponent,
    GithubComponent,
    ContactComponent,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent {}
