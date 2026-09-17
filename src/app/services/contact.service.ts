import { Injectable } from "@angular/core";
import emailjs from "@emailjs/browser";
import { defer, map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { PROFILE } from "../data/profile";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({ providedIn: "root" })
export class ContactService {
  submitContact(data: ContactFormData): Observable<void> {
    return defer(() =>
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.message,
          to_email: PROFILE.email,
        },
        { publicKey: environment.emailjs.publicKey },
      ),
    ).pipe(map(() => undefined));
  }
}
