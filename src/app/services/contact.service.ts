import { Injectable } from "@angular/core";
import emailjs from "@emailjs/browser";
import { defer, map, Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  captchaToken: string;
}

@Injectable({ providedIn: "root" })
export class ContactService {
  submitContact(data: ContactFormData): Observable<void> {
    return defer(() => {
      if (!data.captchaToken.trim()) throw new Error("Verificação de segurança obrigatória.");
      return emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.message,
          "g-recaptcha-response": data.captchaToken,
        },
        { publicKey: environment.emailjs.publicKey },
      );
    }).pipe(map(() => undefined));
  }
}
