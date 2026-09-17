import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  inject,
} from "@angular/core";
import { MotionService } from "../services/motion.service";
@Directive({ selector: "[appReveal]", standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly motion = inject(MotionService);
  private observer?: IntersectionObserver;
  ngAfterViewInit(): void {
    const node = this.host.nativeElement;
    if (
      !this.motion.enabled ||
      !("IntersectionObserver" in window) ||
      node.getBoundingClientRect().top < window.innerHeight
    )
      return;
    node.classList.add("reveal-pending");
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.remove("reveal-pending");
          node.classList.add("reveal-entered");
          this.observer?.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px 30px 0px" },
    );
    this.observer.observe(node);
  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
