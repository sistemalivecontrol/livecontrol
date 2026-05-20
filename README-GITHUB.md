# COMO PUBLICAR NO GITHUB PAGES (Passo a Passo)

## Requisitos
- Conta no GitHub (voce ja tem: sistemalivecontrol)
- Repositorio criado: github.com/sistemalivecontrol/livecontrol

---

## PASSO 1: Apague a versao antiga do GitHub

1. Acesse https://github.com/sistemalivecontrol/livecontrol
2. Se tiver arquivos antigos, clique nos 3 pontos de cada arquivo > Delete
3. Ou va em Settings > General > Danger Zone > Delete this repository
4. Recrie o repositorio vazio em https://github.com/new
   - Nome: `livecontrol`
   - Public
   - NAO marque "Add a README"
   - Clique em "Create repository"

---

## PASSO 2: Suba os arquivos pelo upload do GitHub

1. No seu repositorio (agora vazio), clique em **"uploading an existing file"**
2. Arraste TODA a pasta do projeto (todos os arquivos e pastas)
   - Inclua: src/, public/, .github/, package.json, vite.config.ts, etc.
3. Em "Commit changes", escreva: `Primeiro commit`
4. Clique em **"Commit changes"**

---

## PASSO 3: Ative o GitHub Pages

1. No repositorio, va em **Settings** (aba superior)
2. No menu lateral esquerdo, clique em **Pages**
3. Em "Source", selecione: **GitHub Actions**
4. Pronto! O GitHub vai buildar e publicar automaticamente

---

## PASSO 4: Aguarde e acesse

- Aguarde 1-2 minutos
- Acesse: **https://sistemalivecontrol.github.io/livecontrol/**

---

## Para atualizar depois (quando editar algo)

1. Edite os arquivos em `src/sections/`
2. Va no GitHub, faca upload dos arquivos editados
3. O GitHub Actions builda e publica automaticamente!

---

## Qual arquivo editar para mudar o texto?

| Para mudar... | Edite este arquivo |
|---|---|
| Titulo do topo | `src/sections/HeroSection.tsx` |
| Funcionalidades (6 cards) | `src/sections/FeaturesSection.tsx` |
| Como Funciona (3 passos) | `src/sections/HowItWorksSection.tsx` |
| Diferenciais (6 cards) | `src/sections/DifferentialsSection.tsx` |
| Beneficios (7 checks) | `src/sections/BenefitsSection.tsx` |
| Entregas (6 cards) | `src/sections/DeliverySection.tsx` |
| Precos dos planos | `src/sections/PricingSection.tsx` |
| Depoimentos | `src/sections/TestimonialsSection.tsx` |
| Perguntas frequentes | `src/sections/FAQSection.tsx` |
| Rodape (contato, links) | `src/sections/Footer.tsx` |
| Botao WhatsApp | `src/components/WhatsAppFloat.tsx` |
