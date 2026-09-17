import { Injectable, OnDestroy, signal } from "@angular/core";
@Injectable({ providedIn: "root" })
export class MotionService implements OnDestroy {
  private readonly preference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  readonly reduced = signal(this.preference.matches);
  readonly paused = signal(false);
  private readonly onChange = () => {
    this.reduced.set(this.preference.matches);
    this.sync();
  };
  constructor() {
    this.preference.addEventListener("change", this.onChange);
    this.sync();
  }
  get enabled(): boolean {
    return !this.reduced() && !this.paused();
  }
  toggle(): void {
    this.paused.update((value) => !value);
    this.sync();
  }
  private sync(): void {
    document.documentElement.dataset["motion"] = this.enabled ? "on" : "off";
  }
  ngOnDestroy(): void {
    this.preference.removeEventListener("change", this.onChange);
  }
}
