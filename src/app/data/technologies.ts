export interface Technology {
  name: string;
  icon: string;
}
const tech = (name: string, icon = "code"): Technology => ({ name, icon });
export const TECHNOLOGIES = [
  {
    id: "backend",
    title: "Back-end",
    icon: "terminal",
    description: "Lógica, segurança e regras de negócio.",
    items: [
      tech("Java", "java"),
      tech("Spring Boot", "spring"),
      tech("Spring Security", "shield"),
      tech("JPA", "layers"),
      tech("Hibernate", "layers"),
      tech("JWT", "shield"),
      tech("APIs REST", "code"),
    ],
  },
  {
    id: "frontend",
    title: "Front-end",
    icon: "screen",
    description: "Interfaces que conectam pessoas e software.",
    items: [
      tech("Angular", "angular"),
      tech("React", "react"),
      tech("JavaScript"),
      tech("TypeScript"),
      tech("HTML5"),
      tech("CSS3"),
      tech("Flexbox", "grid"),
      tech("CSS Grid", "grid"),
    ],
  },
  {
    id: "database",
    title: "Banco de dados",
    icon: "database",
    description: "Dados organizados, aplicações consistentes.",
    items: [
      tech("PostgreSQL", "database"),
      tech("MySQL", "database"),
      tech("SQL Server", "database"),
    ],
  },
  {
    id: "tools",
    title: "Ferramentas",
    icon: "layers",
    description: "Da primeira linha ao controle de versão.",
    items: [
      tech("Git", "git"),
      tech("GitHub", "github"),
      tech("Docker", "docker"),
      tech("Postman", "code"),
      tech("VS Code", "code"),
      tech("IntelliJ IDEA", "terminal"),
    ],
  },
];
export const ORBIT_TECHNOLOGIES = [
  tech("Java", "java"),
  tech("Spring Boot", "spring"),
  tech("Angular", "angular"),
  tech("React", "react"),
  tech("PostgreSQL", "database"),
  tech("Docker", "docker"),
  tech("Git", "git"),
];
