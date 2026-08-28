import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactWidgetComponent } from './react-widgets/react-widget.component';
import { ContactService } from './services/contact.service';

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
  featured?: boolean;
  image?: string;
  gradient?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  activeFilter = 'Todos';
  mobileMenuOpen = false;
  submitted = false;
  visitorName = '';
  visitorEmail = '';
  visitorMessage = '';
  
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  readonly filters = ['Todos', 'Landing Pages', 'Full Stack', 'Back-end'];

  readonly projects: Project[] = [
    {
      title: 'Noroeste Guincho',
      category: 'Landing Pages',
      description: 'Landing page para serviço de reboque e auto socorro 24h. Design moderno com CTA estratégicos e informações de serviço.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsivo'],
      link: 'https://www.noroeste-guincho.com.br',
      github: 'https://github.com/Heitor-Bailke/Noroeste-capixaba',
      featured: true,
      image: 'assets/projects/noroeste-guincho.jpg'
    },
    {
      title: 'Clínica Animale',
      category: 'Landing Pages',
      description: 'Website para clínica veterinária com apresentação de serviços, especialistas e agenda online. Design elegante e acessível.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsivo'],
      link: 'https://heitor-bailke.github.io/ClinicaVeterinariaAnimale/',
      github: 'https://github.com/Heitor-Bailke/ClinicaVeterinariaAnimale',
      featured: true,
      image: 'assets/projects/clinica-animale.jpg'
    },
    {
      title: 'Sistema Financeiro',
      category: 'Full Stack',
      description: 'Aplicação para organização de receitas, despesas e informações financeiras com dashboard interativo.',
      technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'],
      link: '#',
      github: '#',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'API de Usuário',
      category: 'Back-end',
      description: 'API REST completa com autenticação JWT, autorização por roles, CRUD de usuários e integração com PostgreSQL.',
      technologies: ['Java', 'Spring Boot', 'JWT', 'PostgreSQL', 'REST'],
      link: '#',
      github: 'https://github.com/Heitor-Bailke/usuario',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ];

  readonly technologies = [
    'Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
    'Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'MySQL', 'Git', 'Docker'
  ];

  constructor(private contactService: ContactService) {}

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'Todos') {
      return this.projects;
    }

    return this.projects.filter((project) => project.category === this.activeFilter);
  }

  ngOnInit(): void {
    this.observeSections();
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.closeMenu();
  }

  submitContact(): void {
    if (!this.visitorName.trim() || !this.visitorEmail.trim() || !this.visitorMessage.trim()) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      this.successMessage = '';
      return;
    }

    if (!this.isValidEmail(this.visitorEmail)) {
      this.errorMessage = 'Por favor, insira um e-mail válido.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.contactService.submitContact({
      name: this.visitorName,
      email: this.visitorEmail,
      message: this.visitorMessage
    }).subscribe({
      next: (response) => {
        this.submitted = true;
        this.successMessage = 'Mensagem enviada com sucesso! Vou responder em breve.';
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Erro ao enviar mensagem. Tente novamente.';
        this.isLoading = false;
        console.error('Erro ao enviar contato:', error);
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm(): void {
    setTimeout(() => {
      this.visitorName = '';
      this.visitorEmail = '';
      this.visitorMessage = '';
      this.submitted = false;
      this.successMessage = '';
    }, 3000);
  }

  private observeSections(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }
}
