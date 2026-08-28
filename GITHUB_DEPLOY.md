# 🚀 Próximo Passo: Deploy no GitHub Pages

Seu portfólio está pronto para ir ao ar! Siga estas instruções:

## 1️⃣ Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório com o nome: **`heitorbailke.github.io`**
3. **NÃO** inicialize com README, .gitignore ou licença
4. Clique em "Create repository"

## 2️⃣ Conectar ao Repositório Local

Execute no terminal (dentro da pasta do projeto):

```bash
git remote add origin https://github.com/SEU_USUARIO/heitorbailke.github.io.git
git push -u origin main
```

⚠️ **Substitua `SEU_USUARIO` pelo seu usuário do GitHub!**

## 3️⃣ Configurar GitHub Pages

1. Vá em **Settings** do repositório
2. Vá para **Pages** (abas à esquerda)
3. Em "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **/(root)**
4. Salve

## 4️⃣ Pronto! 🎉

Seu portfólio ficará online em:
```
https://heitorbailke.github.io/
```

## 📝 Para Futuras Atualizações

Sempre que quiser atualizar:
```bash
npm run build  # (já foi feito, mas faça quando mudar código)
git add .
git commit -m "Descrição da mudança"
git push origin main
```

O **GitHub Actions** vai fazer o deploy automaticamente! ✨

---

### ✅ Resumo do que foi feito:
- ✅ Projeto compilado (build)
- ✅ GitHub Actions configurado (deploy automático)
- ✅ Git inicializado e commitado
- ✅ Pronto para push

**Agora execute o comando do Passo 2 acima!** 🚀
