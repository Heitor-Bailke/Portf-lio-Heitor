import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {
    // Inicializar EmailJS com a chave pública
    emailjs.init(environment.emailjs.publicKey);
  }

  submitContact(data: ContactFormData): Observable<ContactResponse> {
    return new Observable((observer) => {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: 'heitorbailkedev@hotmail.com'
      };

      emailjs
        .send(
          environment.emailjs.serviceId,
          environment.emailjs.templateId,
          templateParams
        )
        .then(
          (response) => {
            console.log('Email enviado com sucesso:', response);
            observer.next({
              success: true,
              message: 'Mensagem enviada com sucesso!'
            });
            observer.complete();
          },
          (error) => {
            console.error('Erro ao enviar email:', error);
            const errorMessage = this.getErrorMessage(error);
            observer.error(new Error(errorMessage));
          }
        );
    });
  }

  private getErrorMessage(error: any): string {
    if (error.text) {
      return `Erro ao enviar: ${error.text}`;
    }
    if (error.message) {
      return `Erro: ${error.message}`;
    }
    return 'Erro ao enviar mensagem. Verifique sua configuração do EmailJS.';
  }
}
