import { Component } from "@angular/core";
import { ViewportScroller } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar.component";
import { FooterComponent } from "./components/footer.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(viewport: ViewportScroller) {
    viewport.setOffset([0, 100]);
  }
  skipToContent(event: Event): void {
    event.preventDefault();
    const main = document.getElementById("main-content");
    main?.focus();
    main?.scrollIntoView();
  }
}
