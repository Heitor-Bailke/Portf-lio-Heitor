# Configuração EmailJS - Portfólio Heitor

Este projeto usa **EmailJS** para enviar emails de contato diretamente do frontend, sem necessidade de backend.

## 📋 Passo a Passo de Configuração

### 1. Criar Conta no EmailJS
1. Acesse [https://www.emailjs.com](https://www.emailjs.com)
2. Clique em **"Create Free Account"**
3. Complete o registro com seu email

### 2. Configurar Serviço de Email
1. Na dashboard, vá para **Email Services**
2. Clique em **"Add Service"**
3. Escolha seu provedor:
   - **Gmail** (recomendado)
   - Outlook
   - Outro SMTP

#### Para Gmail:
1. Selecione **Gmail**
2. Conecte sua conta Google
3. Autorize o acesso
4. Copie o **Service ID** (exemplo: `service_abc123xyz`)

### 3. Criar Template de Email
1. Vá para **Email Templates**
2. Clique em **"Create New Template"**
3. Use este template:

```
Name: Contact Form
Subject: Nova mensagem de {{from_name}}

Content:
---
De: {{from_name}} ({{from_email}})

Mensagem:
{{message}}
---
```

4. Configure os campos:
   - **To Email**: `heitorbailkedev@hotmail.com`
   - **From Email**: `{{from_email}}` (do formulário)
   - **Subject**: `Nova mensagem de {{from_name}}`

5. Copie o **Template ID** (exemplo: `template_abc123xyz`)

### 4. Obter Chave Pública
1. Vá para **Account > API Keys**
2. Copie sua **Public Key** (exemplo: `abc123xyz_public`)

### 5. Configurar o Projeto
Abra o arquivo `src/environments/environment.ts` e preencha:

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_SEU_SERVICE_ID_AQUI',
    templateId: 'template_SEU_TEMPLATE_ID_AQUI',
    publicKey: 'SUA_PUBLIC_KEY_AQUI'
  }
};
```

### 6. Testar
1. Execute: `npm start`
2. Vá para a seção de **Contato**
3. Preencha o formulário e envie
4. Verifique seu email: `heitorbailkedev@hotmail.com`

## 🎯 Exemplo Completo

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_7x9z2k1m5n',
    templateId: 'template_w3q8r2p9l',
    publicKey: 'x7z2k9m1w3q5r8p2_public'
  }
};
```

## ⚠️ Limites Gratuitos do EmailJS
- **150 emails/mês** no plano free
- Ideal para portfólios pequenos
- Upgrade para planos pagos se necessário

## 🔒 Segurança
- A chave pública é segura de usar no frontend
- Nunca compartilhe sua chave privada!
- EmailJS protege contra abuso com limites de taxa

## 📞 Suporte
- Documentação: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- Comunidade: [https://www.emailjs.com/forum](https://www.emailjs.com/forum)

---

Após configurar, seus emails de contato serão enviados automaticamente! 🎉
