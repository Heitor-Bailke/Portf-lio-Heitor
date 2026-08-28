# 🚀 Próximo Passo: Deploy no GitHub Pages

Seu portfólio está pronto para ir ao ar! Siga estas instruções:

## 1️⃣ Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório com o nome: **`Portfólio-Heitor`**
3. **NÃO** inicialize com README, .gitignore ou licença
4. Clique em "Create repository"

## 2️⃣ Conectar ao Repositório Local

Execute no terminal (dentro da pasta do projeto):

```bash
git remote add origin https://github.com/heitorbailke/Portfólio-Heitor.git
git push -u origin main
```

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
https://heitorbailke.github.io/Portfólio-Heitor/
```

## 📝 Para Futuras Atualizações

Sempre que quiser atualizar:
```bash
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
- ✅ Base URL configurada para `/Portfólio-Heitor/`
- ✅ Pronto para push

**Agora execute os comandos do Passo 2 acima!** 🚀
