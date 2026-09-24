import { CommonModule } from "@angular/common";
import { Component, OnDestroy, ViewChild } from "@angular/core";
import { CaptchaComponent } from "../components/captcha.component";
import { FormsModule, NgForm } from "@angular/forms";
import { IconComponent } from "../components/icon.component";
import { RevealDirective } from "../directives/reveal.directive";
import { Subscription } from "rxjs";
import { ContactService } from "../services/contact.service";
import { PROFILE } from "../data/profile";
@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, RevealDirective, CaptchaComponent],
  templateUrl: "./contact.component.html",
})
export class ContactComponent implements OnDestroy {
  readonly profile = PROFILE;
  @ViewChild(CaptchaComponent) captcha?: CaptchaComponent;
  captchaToken = "";
  visitorName = "";
  visitorEmail = "";
  visitorPhone = "";
  visitorMessage = "";
  isLoading = false;
  successMessage = "";
  errorMessage = "";
  private submission?: Subscription;
  constructor(private readonly contactService: ContactService) {}
  submitContact(form: NgForm): void {
    if (this.isLoading) return;
    this.successMessage = "";
    this.errorMessage = "";
    if (
      form.invalid ||
      !this.visitorName.trim() ||
      !this.visitorMessage.trim()
    ) {
      form.control.markAllAsTouched();
      this.errorMessage = "Preencha seu nome, um e-mail válido e a mensagem.";
      return;
    }
    if (!this.captchaToken) {
      this.errorMessage = "Confirme que você não é um robô antes de enviar.";
      return;
    }
    this.isLoading = true;
    this.submission = this.contactService
      .submitContact({
        name: this.visitorName.trim(),
        email: this.visitorEmail.trim(),
        phone: this.visitorPhone.trim(),
        message: this.visitorMessage.trim(),
        captchaToken: this.captchaToken,
      })
      .subscribe({
        next: () => {
          this.resetCaptcha();
          this.isLoading = false;
          form.resetForm();
          this.visitorName = "";
          this.visitorEmail = "";
          this.visitorPhone = "";
          this.visitorMessage = "";
          this.successMessage =
            "Mensagem enviada! Obrigado pelo contato. Responderei em breve.";
        },
        error: () => {
          this.resetCaptcha();
          this.isLoading = false;
          this.errorMessage =
            "Não foi possível enviar agora. Tente novamente ou entre em contato pelo e-mail ao lado.";
        },
      });
  }
  ngOnDestroy(): void {
    this.submission?.unsubscribe();
  }
  private resetCaptcha(): void {
    this.captchaToken = "";
    this.captcha?.reset();
  }
}
