export interface CodeExample {
  label: string;
  file: string;
  language: string;
  caption: string;
  source: string;
  code: string;
}
export const AUTH_CONTROLLER_CODE =
  "async function login(req, res, next) {\n  try {\n    const { email, password } = req.body;\n    validateCredentials({ email, password });\n    const session = await loginUser({ email, password });\n    setSessionCookies(res, session);\n    return res.json({ user: session.user });\n  } catch (error) { next(error); }\n}";

export const CODE_EXAMPLES: CodeExample[] = [
  {
    label: "Java",
    file: "UsuarioApplication.java",
    language: "JAVA / SPRING BOOT",
    caption:
      "Código da aplicação Java: ponto de entrada do projeto Spring Boot.",
    source: "https://github.com/Heitor-Bailke/usuario",
    code: "@SpringBootApplication\npublic class UsuarioApplication {\n\n  public static void main(String[] args) {\n    SpringApplication.run(\n      UsuarioApplication.class, args\n    );\n  }\n}",
  },
  {
    label: "Angular",
    file: "finance.service.ts",
    language: "ANGULAR / TYPESCRIPT",
    caption:
      "Trecho real do serviço Angular do HB Finance: chamada HTTP à API autenticada.",
    source:
      "https://github.com/Heitor-Bailke/projeto-controle-financeiro/blob/main/frontend/src/app/services/finance.service.ts",
    code: "getTransactions(): Observable<any[]> {\n  return this.http.get<any[]>(\n    `${this.apiUrl}/transactions`,\n    { withCredentials: true }\n  );\n}",
  },
  {
    label: "API",
    file: "authController.js",
    language: "NODE.JS / EXPRESS",
    caption:
      "Trecho real do HB Finance: validação, serviço de autenticação e sessão.",
    source:
      "https://github.com/Heitor-Bailke/projeto-controle-financeiro/blob/main/backend/controllers/authController.js",
    code: AUTH_CONTROLLER_CODE,
  },
];
