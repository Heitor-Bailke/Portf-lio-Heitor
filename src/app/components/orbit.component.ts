import { Component, ElementRef, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon.component";
import { MotionService } from "../services/motion.service";
import { ORBIT_TECHNOLOGIES } from "../data/technologies";
@Component({
  selector: "app-orbit",
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: ` <div
    class="orbit-scene"
    #scene
    (pointermove)="move($event)"
    (pointerleave)="reset()"
  >
    <div class="orbit-glow" aria-hidden="true"></div>
    <div class="orbit-ring ring-outer" aria-hidden="true"></div>
    <div class="orbit-ring ring-inner" aria-hidden="true"></div>
    <div class="portrait-frame">
      <img
        src="assets/projects/Foto-Heitor-Principal.jpg"
        alt="Heitor Bailke"
        width="1080"
        height="1080"
        fetchpriority="high"
        decoding="async"
      />
    </div>
    <div
      class="orbit-track"
      *ngFor="let tech of technologies; let i = index"
      [class.inner-track]="i > 3"
      [style.--angle]="i < 4 ? i * 90 + 20 + 'deg' : (i - 4) * 120 + 40 + 'deg'"
      [style.--duration]="i < 4 ? '80s' : '64s'"
      [style.--direction]="i < 4 ? 'normal' : 'reverse'"
    >
      <span class="orbit-satellite" [attr.title]="tech.name"
        ><span class="orbit-counter"
          ><app-icon [name]="tech.icon" /><span class="sr-only">{{
            tech.name
          }}</span></span
        ></span
      >
    </div>
    <span class="orbit-particle particle-one" aria-hidden="true"></span
    ><span class="orbit-particle particle-two" aria-hidden="true"></span>
    <span class="orbit-caption orbit-caption-top" aria-hidden="true"
      >&lt; developer /&gt;</span
    ><span class="orbit-caption orbit-caption-bottom" aria-hidden="true"
      >BACK-END + FRONT-END</span
    >
  </div>`,
})
export class OrbitComponent {
  readonly technologies = ORBIT_TECHNOLOGIES;
  readonly motion = inject(MotionService);
  @ViewChild("scene", { static: true }) scene!: ElementRef<HTMLElement>;
  move(event: PointerEvent): void {
    if (!this.motion.enabled || event.pointerType !== "mouse") return;
    const r = this.scene.nativeElement.getBoundingClientRect();
    this.scene.nativeElement.style.setProperty(
      "--parallax-x",
      ((event.clientX - r.left - r.width / 2) / r.width) * 8 + "px",
    );
    this.scene.nativeElement.style.setProperty(
      "--parallax-y",
      ((event.clientY - r.top - r.height / 2) / r.height) * 8 + "px",
    );
  }
  reset(): void {
    this.scene.nativeElement.style.setProperty("--parallax-x", "0px");
    this.scene.nativeElement.style.setProperty("--parallax-y", "0px");
  }
}
