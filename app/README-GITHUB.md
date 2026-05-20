# Como Publicar no GitHub Pages

## Metodo 1: Script Automatico (Recomendado)

### Requisitos
- [Node.js](https://nodejs.org/) instalado
- [Git](https://git-scm.com/) instalado
- Conta no GitHub

### Passo a Passo

**1. Crie o repositorio no GitHub**
- Acesse https://github.com/new
- Nome do repositorio: `livecontrol`
- Deixe em **Public**
- NAO marque "Add a README"
- Clique em **Create repository**

**2. Extraia o ZIP**
- Extraia o arquivo ZIP em qualquer pasta do computador

**3. Abra o terminal**
- Windows: botao direito na pasta > "Open in Terminal" ou "Git Bash Here"
- Mac/Linux: abra o Terminal e navegue ate a pasta com `cd`

**4. Execute o script**
```bash
bash deploy.sh
```
- Digite seu usuario do GitHub quando pedir
- Aguarde o processo terminar

**5. Acesse seu site**
```
https://SEU-USUARIO.github.io/livecontrol/
```

Pronto! Seu site estara no ar em 1-2 minutos.

---

## Metodo 2: Manual (Se o script nao funcionar)

### 1. Crie o repositorio no GitHub
https://github.com/new
- Nome: `livecontrol`
- Public
- NAO adicione README

### 2. Abra o terminal na pasta do projeto

### 3. Execute os comandos:

```bash
# Instale as dependencias
npm install

# Gere o build
npm run build

# Instale o gh-pages
npm install --save-dev gh-pages

# Faca o deploy
npx gh-pages -d dist --repo https://github.com/SEU-USUARIO/livecontrol.git
```

### 4. Acesse:
```
https://SEU-USUARIO.github.io/livecontrol/
```

---

## Para Atualizar o Site (depois de editar)

Sempre que editar os arquivos e quiser atualizar o site:

```bash
npm run build
npx gh-pages -d dist
```

Ou simplesmente rode novamente:
```bash
bash deploy.sh
```

---

## Estrutura dos Arquivos

```
/
├── deploy.sh          <-- Script automatico (execute este!)
├── README-GITHUB.md   <-- Este arquivo
├── package.json       <-- Configuracoes do projeto
├── vite.config.ts     <-- Configuracao do Vite (base: '/livecontrol/')
├── src/
│   ├── App.tsx        <-- Estrutura do site
│   ├── sections/      <-- Todas as secoes do site
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── DifferentialsSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── DeliverySection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ...
│   └── components/    <-- Componentes reutilizaveis
├── public/assets/     <-- Imagens, videos, avatares
└── dist/              <-- Build gerado (NAO edite manualmente)
```

---

## Dica Importante

O arquivo `vite.config.ts` ja esta configurado com:
```ts
base: '/livecontrol/'
```

Isso faz o site funcionar corretamente no GitHub Pages. **Nao mude** este valor a menos que mude o nome do repositorio.
