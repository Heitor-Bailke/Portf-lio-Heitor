import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnDestroy, Output, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

interface CaptchaApi {
  render(element: HTMLElement, options: Record<string, unknown>): number;
  reset(id: number): void;
}
declare global {
  interface Window {
    grecaptcha?: CaptchaApi;
    portfolioCaptchaReady?: () => void;
  }
}
let loading: Promise<CaptchaApi> | undefined;
function loadCaptcha(): Promise<CaptchaApi> {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (loading) return loading;
  loading = new Promise<CaptchaApi>((resolve, reject) => {
    const script = document.createElement("script");
    const fail = () => {
      clearTimeout(timeout);
      script.remove();
      delete window.portfolioCaptchaReady;
      loading = undefined;
      reject(new Error("CAPTCHA unavailable"));
    };
    const timeout = window.setTimeout(fail, 20000);
    window.portfolioCaptchaReady = () => {
      if (!window.grecaptcha?.render) { fail(); return; }
      clearTimeout(timeout);
      delete window.portfolioCaptchaReady;
      resolve(window.grecaptcha);
    };
    script.src = "https://www.google.com/recaptcha/api.js?onload=portfolioCaptchaReady&render=explicit&hl=pt-BR";
    script.async = true;
    script.defer = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return loading;
}

@Component({
  selector: "app-captcha",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #host></div>
    <p class="feedback" role="status" *ngIf="status">{{ status }}</p>
    <button class="text-link" type="button" *ngIf="failed" (click)="load()">Tentar carregar verificação novamente</button>
  `,
  styles: [":host { display: block; min-width: 0; } button { background: transparent; border: 0; padding: 8px 0; text-align: left; }"]
})
export class CaptchaComponent implements AfterViewInit, OnDestroy {
  @ViewChild("host", { static: true }) host!: ElementRef<HTMLElement>;
  @Output() tokenChange = new EventEmitter<string>();
  private readonly zone = inject(NgZone);
  private api?: CaptchaApi;
  private widget?: number;
  private destroyed = false;
  status = "Carregando verificação de segurança…";
  failed = false;

  ngAfterViewInit(): void { void this.load(); }
  async load(): Promise<void> {
    this.failed = false;
    this.status = "Carregando verificação de segurança…";
    try {
      this.api = await loadCaptcha();
      if (this.destroyed) return;
      if (this.widget !== undefined) {
        this.reset();
        this.status = "Confirme que você não é um robô.";
        return;
      }
      this.widget = this.api.render(this.host.nativeElement, {
        sitekey: "6Lfq3cwtAAAAAO3Z7RPva6encoUQSXdn3yQQYXjW",
        theme: document.documentElement.dataset["theme"] === "dark" ? "dark" : "light",
        size: this.host.nativeElement.clientWidth < 304 ? "compact" : "normal",
        callback: (token: string) => this.update(token, ""),
        "expired-callback": () => this.update("", "A verificação expirou. Confirme novamente."),
        "error-callback": () => this.update("", "Não foi possível verificar. Tente novamente ou use o e-mail ao lado.", true),
      });
      if (!this.failed) this.status = "";
    } catch {
      this.update("", "Não foi possível carregar a verificação. Tente novamente ou use o e-mail ao lado.", true);
    }
  }
  private update(token: string, status: string, failed = false): void {
    if (this.destroyed) return;
    this.zone.run(() => {
      this.status = status;
      this.failed = failed;
      this.tokenChange.emit(token);
    });
  }
  reset(): void {
    if (this.widget !== undefined) this.api?.reset(this.widget);
    this.update("", "");
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.widget !== undefined) this.api?.reset(this.widget);
  }
}
