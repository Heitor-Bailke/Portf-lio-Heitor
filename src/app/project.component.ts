import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { PROFILE } from "./data/profile";
import { ALL_PROJECTS } from "./data/projects";
import { AUTH_CONTROLLER_CODE } from "./data/code-examples";
@Component({
  selector: "app-project",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./project.component.html",
})
export class ProjectComponent {
  readonly financeCode = AUTH_CONTROLLER_CODE;
  readonly profile = PROFILE;
  readonly project$;
  constructor(route: ActivatedRoute) {
    this.project$ = route.paramMap.pipe(
      map((params) =>
        ALL_PROJECTS.find((project) => project.slug === params.get("slug")),
      ),
    );
  }
}
