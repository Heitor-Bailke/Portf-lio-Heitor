import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        {
          path: "",
          loadComponent: () =>
            import("./app/home.component").then((m) => m.HomeComponent),
          title: "Heitor Bailke | Desenvolvedor Back-end & Front-end Júnior",
        },
        {
          path: "projetos/:slug",
          loadComponent: () =>
            import("./app/project.component").then((m) => m.ProjectComponent),
          title: (route) =>
            import("./app/data/projects").then(({ ALL_PROJECTS }) => {
              const project = ALL_PROJECTS.find(
                (item) => item.slug === route.paramMap.get("slug"),
              );
              return project
                ? `${project.title} | Heitor Bailke`
                : "Projeto não encontrado | Heitor Bailke";
            }),
        },
        { path: "**", redirectTo: "" },
      ],
      withHashLocation(),
      withInMemoryScrolling({
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ),
  ],
}).catch((error: unknown) => console.error(error));
