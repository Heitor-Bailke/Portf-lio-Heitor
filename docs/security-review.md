# Revisão do relatório de segurança — 24/09/2026

Escopo: relatório HTML fornecido pelo usuário, código deste portfólio, cabeçalhos públicos e leitura dos dois caminhos públicos citados. Nenhum e-mail enviado, token forjado ou teste de exploração executado nesta revisão.

| Item | Avaliação | Situação |
| --- | --- | --- |
| F-01 JWT em Distribuidora-GamaEnsino | O caminho indicado retornou HTTP 404. Não foi possível confirmar segredo atual nem uso em produção. Um token gerado localmente não demonstra aceitação por um servidor. | Se a chave publicada tiver sido usada, rotacionar no ambiente correspondente e invalidar os tokens antigos. Remover do histórico não substitui rotação. Outro repositório, não alterado aqui. |
| F-02 EmailJS | IDs e publicKey são públicos por projeto. `.env` incorporado ao build não os esconde. Origin não autentica scripts externos; a alegação de envio do relatório não foi reproduzida. | Removido `to_email` redundante. Capturas mostram destinatário fixo, CC/BCC vazios e Auto-Reply sem template. Ainda requer CAPTCHA validado pelo EmailJS ou backend com validação e limites. |
| F-03 Clickjacking | X-Frame-Options ausente na resposta consultada. Impacto depende do conteúdo; não há demonstração de exploração no relatório. | Exige cabeçalho HTTP `Content-Security-Policy: frame-ancestors 'none'` ou `X-Frame-Options: DENY` em hospedagem/proxy que permita configurá-lo. Meta tag não funciona para frame-ancestors. |
| F-04 CSP | Não havia CSP no código; cabeçalho ausente na resposta pública. Isso é falta de defesa adicional, não prova de XSS. | Build npm agora injeta CSP em meta, com scripts locais e hash do inicializador de tema, conexão EmailJS permitida e objetos bloqueados. Estilos inline seguem permitidos para Angular. Validação estática e compilação realizadas; teste em navegador ainda pendente. |
| F-05 Remetente | Usar o endereço conectado como From é comportamento esperado; os dados do visitante não são autenticados. | No painel, preferir From Name fixo `Contato do portfólio`, assunto fixo `[Portfólio] Novo contato`, Reply To `{{from_email}}`, endereço padrão marcado e destinatário fixo. Não mudar From Email para o visitante. Painel não alterado nesta revisão. |
| F-06 HSTS | Ausente na resposta HTTPS consultada. | Configuração de hospedagem/CDN. Não habilitar includeSubDomains/preload sem revisar todos os subdomínios. |
| F-07 Senha de estudo | Caminho indicado retornou HTTP 404. | Não confirmado atualmente. Se foi uma credencial real/reutilizada, trocar e usar variável de ambiente no projeto correspondente. |
| F-08 WhatsApp | Contato publicado intencionalmente no site e currículo. | Mantido. É uma decisão de privacidade, não evidência de invasão. |

## Correção de ambiente

O Angular já usava `defaultConfiguration: production`; o booleano customizado `production: false` não provava build de desenvolvimento. Agora há substituição explícita do arquivo para produção. Os IDs públicos do EmailJS são compartilhados em `emailjs.config.ts` e não contêm uma chave privada.

## CSP e publicação

`npm run build` executa `scripts/secure-build.mjs` via postbuild, inclusive no workflow existente. Executar somente `ng build` não aplica essa etapa. O hash é calculado sobre os scripts inline do HTML final. Critical CSS inline foi desativado para evitar handlers inline do carregamento de estilos. A política não é aplicada ao servidor de desenvolvimento.

A política via meta não fornece HSTS nem proteção frame-ancestors. Ao integrar CAPTCHA, revisar script-src, frame-src e connect-src para os endpoints oficiais utilizados antes de publicar.

## Próximo passo dependente de configuração externa

Cadastrar reCAPTCHA v2 para o domínio, obter a site key pública e habilitar a verificação no template EmailJS com a chave secreta somente no painel. Implementar e publicar o widget/token em conjunto com essa configuração. Não habilitar a exigência no template antes da integração, pois bloquearia o formulário atual. Não enviar a chave secreta pelo chat nem colocá-la no Angular.

Não houve publicação dessas mudanças nesta revisão. Os ajustes de conta e hospedagem não foram realizados.

## Fontes

- https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/
- https://www.emailjs.com/docs/user-guide/adding-captcha-verification/
- https://www.w3.org/TR/CSP/
- https://angular.dev/tools/cli/environments

## Integração reCAPTCHA implementada

A chave pública fornecida foi integrada ao componente `app-captcha` como reCAPTCHA v2 explícito. O formulário exige um token, trata expiração e falha de carregamento, permite tentar carregar novamente e reinicia a verificação depois de sucesso ou erro de envio. Em espaços estreitos usa o widget compacto. O token é enviado ao EmailJS em `g-recaptcha-response`.

A CSP do build permite os recursos oficiais Google/reCAPTCHA. Build e testes com envio simulado passaram; nenhum e-mail real foi enviado. A validade da chave, os domínios cadastrados e a exigência do token no painel EmailJS ainda precisam de verificação manual. O bloqueio no front-end não substitui a validação no EmailJS.

Para ativar em produção: publicar o build com CAPTCHA, verificar se o widget aparece no domínio cadastrado e habilitar `Enable reCAPTCHA V2 verification` em Settings do template usando a chave secreta correspondente somente no painel. Concluir com um envio manual pelo formulário. Essas etapas externas ainda não foram realizadas.
