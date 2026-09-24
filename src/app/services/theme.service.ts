import { Injectable, OnDestroy, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService implements OnDestroy {
  private readonly preference = window.matchMedia("(prefers-color-scheme: dark)");
  private explicit: string | null = this.readPreference();
  readonly dark = signal(this.explicit ? this.explicit === "dark" : this.preference.matches);
  private readonly onChange = () => {
    if (!this.explicit) {
      this.dark.set(this.preference.matches);
      this.sync();
    }
  };

  constructor() {
    this.preference.addEventListener("change", this.onChange);
    this.sync();
  }

  toggle(): void {
    this.dark.update((value) => !value);
    this.explicit = this.dark() ? "dark" : "light";
    try { localStorage.setItem("portfolio-theme", this.explicit); } catch {}
    this.sync();
  }

  private readPreference(): string | null {
    try {
      const value = localStorage.getItem("portfolio-theme");
      return value === "dark" || value === "light" ? value : null;
    } catch { return null; }
  }

  private sync(): void {
    document.documentElement.dataset["theme"] = this.dark() ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", this.dark() ? "#191816" : "#f3f0e9");
  }

  ngOnDestroy(): void {
    this.preference.removeEventListener("change", this.onChange);
  }
}
