export interface ProjectCase {
  slug: string;
  kind: "BACK-END" | "FRONT-END" | "FULL STACK";
  image?: string;
  frontend?: string;
  backend?: string;
  database?: string;
  title: string;
  label: string;
  status: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  decisions: string[];
  challenges: string[];
  next: string[];
  github?: string;
  demo?: string;
}
const PROJECTS: ProjectCase[] = [
  {
    slug: "hb-finance",
    kind: "FULL STACK",
    image: "assets/projects/hb-finance.png",
    frontend:
      "Angular e TypeScript organizam o dashboard, os formulários, os gráficos e os estados da interface. Serviços centralizam as chamadas HTTP à API.",
    backend:
      "Node.js e Express separam rotas, controllers, serviços e middlewares. O fluxo de autenticação utiliza JWT e refresh token.",
    database:
      "PostgreSQL armazena usuários, categorias, transações e tokens quando configurado. O ambiente de desenvolvimento também oferece armazenamento em memória.",
    title: "HB Finance",
    label: "01 / PROJETO PRINCIPAL",
    status: "Em evolução",
    summary:
      "Aplicação Full Stack para controle de receitas, despesas, categorias e acompanhamento mensal.",
    problem:
      "Reunir as movimentações financeiras em um só lugar e tornar mais fácil entender as entradas e saídas.",
    solution:
      "Uma interface Angular conectada a uma API Node.js/Express. O repositório apresenta o produto como Fluxo Financeiro.",
    technologies: [
      "Angular",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
    ],
    features: [
      "Autenticação com JWT e refresh token.",
      "Registro de receitas e despesas por categoria.",
      "Dashboard mensal, histórico e comparação entre meses.",
      "Fluxo de leitura de comprovantes com OCR.",
    ],
    decisions: [
      "Separação entre frontend, controllers, services e middlewares.",
      "Autenticação e validação tratadas em camadas próprias.",
      "Persistência com PostgreSQL quando configurado e armazenamento em memória para desenvolvimento.",
    ],
    challenges: [
      "Manter a sessão entre chamadas autenticadas.",
      "Organizar lançamentos para compor as análises mensais.",
      "Integrar a leitura de comprovantes ao fluxo financeiro.",
    ],
    next: [
      "Documentar o modo de persistência utilizado na demonstração.",
      "Publicar um ambiente de demonstração.",
      "Evoluir gráficos e integração de OCR.",
    ],
    github: "https://github.com/Heitor-Bailke/projeto-controle-financeiro",
  },
  {
    slug: "api-de-usuarios",
    kind: "BACK-END",
    title: "API de Usuários",
    label: "02 / BACK-END JAVA",
    status: "Em desenvolvimento",
    summary:
      "Projeto Java e Spring Boot voltado ao gerenciamento de usuários e à prática de organização de uma API.",
    problem:
      "Estruturar operações de usuários em uma aplicação com responsabilidades bem definidas.",
    solution:
      "Construir uma API em Java e Spring Boot, evoluindo os contratos e a camada de negócio.",
    technologies: ["Java", "Spring Boot", "Gradle"],
    features: [
      "Projeto Spring Boot com repositório público.",
      "Escopo: operações de cadastro e consulta de usuários.",
      "Escopo: validação de dados e respostas da API.",
    ],
    decisions: [
      "Separar o recebimento de requisições das regras de negócio.",
      "Definir contratos de entrada e saída.",
      "Evoluir a persistência junto ao modelo de domínio.",
    ],
    challenges: [
      "Definir responsabilidades por camada.",
      "Manter contratos consistentes para a interface.",
    ],
    next: [
      "Documentar endpoints e funcionalidades concluídas.",
      "Apresentar os testes e as decisões de segurança.",
    ],
    github: "https://github.com/Heitor-Bailke/usuario",
  },
  {
    slug: "e-commerce",
    kind: "FULL STACK",
    title: "E-commerce",
    label: "03 / PRÓXIMO PROJETO",
    status: "Planejado",
    summary:
      "Um próximo passo para explorar catálogo, pedidos e regras de negócio em uma aplicação de comércio eletrônico.",
    problem:
      "Modelar a jornada entre a descoberta de um produto e a criação de um pedido.",
    solution:
      "Planejar uma aplicação por domínios, começando pelo catálogo e evoluindo para carrinho e pedidos.",
    technologies: [
      "Java · previsto",
      "Spring Boot · previsto",
      "PostgreSQL · previsto",
    ],
    features: [
      "Planejado: catálogo de produtos.",
      "Planejado: carrinho de compras.",
      "Planejado: criação e acompanhamento de pedidos.",
    ],
    decisions: [
      "Proposta: separar catálogo, usuários e pedidos em domínios.",
      "Proposta: definir os contratos da API antes da integração com a interface.",
    ],
    challenges: [
      "A explorar: consistência dos dados na criação de pedidos.",
      "A explorar: validação de disponibilidade e quantidades.",
    ],
    next: [
      "Definir o escopo da primeira versão.",
      "Modelar as entidades e os relacionamentos.",
      "Iniciar a implementação e publicar o repositório.",
    ],
  },
];
const WEB_PROJECTS = [
  {
    slug: "andre-fisioterapeuta",
    technologies: ["Angular", "TypeScript", "HTML", "CSS"],
    title: "André Fisioterapeuta",
    description:
      "Apresentação de serviços de fisioterapia e contato direto com o profissional.",
    image: "assets/projects/andre-fisioterapeuta.png",
    demo: "https://heitor-bailke.github.io/Andre_Fisioterapeuta/",
    github: "https://github.com/Heitor-Bailke/Andre_Fisioterapeuta",
  },
  {
    slug: "noroeste-guincho",
    technologies: ["HTML", "CSS", "JavaScript"],
    title: "Noroeste Guincho",
    description:
      "Presença digital para um serviço de reboque e auto socorro 24 horas.",
    image: "assets/projects/noroeste-guincho.jpg",
    demo: "https://www.noroeste-guincho.com.br",
    github: "https://github.com/Heitor-Bailke/Noroeste-capixaba",
  },
  {
    slug: "clinica-animale",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    title: "Clínica Animale",
    description:
      "Interface para apresentação de uma clínica veterinária e seus serviços.",
    image: "assets/projects/clinica-animale.jpg",
    demo: "https://heitor-bailke.github.io/ClinicaVeterinariaAnimale/",
    github: "https://github.com/Heitor-Bailke/ClinicaVeterinariaAnimale",
  },
];

export const ALL_PROJECTS: ProjectCase[] = [
  ...PROJECTS,
  ...WEB_PROJECTS.map((project) => ({
    slug: project.slug,
    title: project.title,
    kind: "FRONT-END" as const,
    label: "FRONT-END / INTERFACE WEB",
    status: "Demonstração disponível",
    summary: project.description,
    problem:
      "Apresentar os serviços de forma clara e permitir que o visitante encontre as informações de que precisa, também no celular.",
    solution: project.description,
    technologies: project.technologies,
    image: project.image,
    github: project.github,
    demo: project.demo,
    frontend:
      "Interface responsiva construída com " +
      project.technologies.join(", ") +
      ". Estrutura visual voltada à leitura dos serviços e ao contato.",
    features: [
      "Apresentação dos serviços e informações do negócio.",
      "Layout adaptado a diferentes tamanhos de tela.",
      "Navegação entre as seções e canais de contato.",
    ],
    decisions: [
      "Organizar a hierarquia visual para destacar as informações principais.",
      "Adaptar a composição de conteúdo ao espaço disponível na tela.",
    ],
    challenges: [
      "Equilibrar clareza, identidade visual e responsividade.",
      "Manter a navegação simples entre apresentação e contato.",
    ],
    next: [
      "Revisar continuamente o conteúdo e a experiência mobile.",
      "Aprimorar acessibilidade e carregamento dos assets.",
    ],
  })),
];
