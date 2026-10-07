var n=`async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    validateCredentials({ email, password });
    const session = await loginUser({ email, password });
    setSessionCookies(res, session);
    return res.json({ user: session.user });
  } catch (error) { next(error); }
}`,e=[{label:"Java",file:"UsuarioApplication.java",language:"JAVA / SPRING BOOT",caption:"C\xF3digo da aplica\xE7\xE3o Java: ponto de entrada do projeto Spring Boot.",source:"https://github.com/Heitor-Bailke/usuario",code:`@SpringBootApplication
public class UsuarioApplication {

  public static void main(String[] args) {
    SpringApplication.run(
      UsuarioApplication.class, args
    );
  }
}`},{label:"Angular",file:"finance.service.ts",language:"ANGULAR / TYPESCRIPT",caption:"Trecho real do servi\xE7o Angular do HB Finance: chamada HTTP \xE0 API autenticada.",source:"https://github.com/Heitor-Bailke/projeto-controle-financeiro/blob/main/frontend/src/app/services/finance.service.ts",code:`getTransactions(): Observable<any[]> {
  return this.http.get<any[]>(
    \`\${this.apiUrl}/transactions\`,
    { withCredentials: true }
  );
}`},{label:"API",file:"authController.js",language:"NODE.JS / EXPRESS",caption:"Trecho real do HB Finance: valida\xE7\xE3o, servi\xE7o de autentica\xE7\xE3o e sess\xE3o.",source:"https://github.com/Heitor-Bailke/projeto-controle-financeiro/blob/main/backend/controllers/authController.js",code:n}];export{n as a,e as b};
