#!/bin/bash

# ============================================================
# DEPLOY LIVECONTROL - GitHub Pages
# ============================================================
# Como usar:
# 1. Extraia o ZIP do projeto
# 2. Abra o terminal na pasta do projeto (onde esta este arquivo)
# 3. Rode: bash deploy.sh
# ============================================================

echo ""
echo "==============================================="
echo "  LIVECONTROL - Deploy para GitHub Pages"
echo "==============================================="
echo ""

# Cores
VERDE='\033[0;32m'
AMARELO='\033[1;33m'
VERMELHO='\033[0;31m'
AZUL='\033[0;34m'
NC='\033[0m' # No Color

# Pergunta o usuario do GitHub
read -p "Digite seu usuario do GitHub (ex: joao123): " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo -e "${VERMELHO}Erro: Voce precisa digitar seu usuario do GitHub.${NC}"
    exit 1
fi

REPO_NAME="livecontrol"
REMOTE_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo -e "${AZUL}Repositorio: $REMOTE_URL${NC}"
echo ""

# Verifica se tem Node.js
if ! command -v node &> /dev/null; then
    echo -e "${VERMELHO}Node.js nao encontrado. Instale o Node.js primeiro:${NC}"
    echo "  https://nodejs.org/ (baixe a versao LTS)"
    exit 1
fi

echo -e "${VERDE}Node.js encontrado: $(node -v)${NC}"

# Verifica se tem git
if ! command -v git &> /dev/null; then
    echo -e "${VERMELHO}Git nao encontrado. Instale o Git primeiro:${NC}"
    echo "  https://git-scm.com/downloads"
    exit 1
fi

echo -e "${VERDE}Git encontrado: $(git --version)${NC}"

# ============================================
# PASSO 1: Instalar dependencias
# ============================================
echo ""
echo -e "${AMARELO}[1/5] Instalando dependencias...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${VERMELHO}Erro ao instalar dependencias.${NC}"
    exit 1
fi

# ============================================
# PASSO 2: Fazer build
# ============================================
echo ""
echo -e "${AMARELO}[2/5] Gerando build de producao...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${VERMELHO}Erro ao gerar build.${NC}"
    exit 1
fi
echo -e "${VERDE}Build gerado com sucesso na pasta dist/${NC}"

# ============================================
# PASSO 3: Configurar Git
# ============================================
echo ""
echo -e "${AMARELO}[3/5] Configurando Git...${NC}"

if [ ! -d .git ]; then
    git init
fi

git remote remove origin 2>/dev/null
git remote add origin "$REMOTE_URL"

# ============================================
# PASSO 4: Instalar gh-pages e fazer deploy
# ============================================
echo ""
echo -e "${AMARELO}[4/5] Instalando gh-pages...${NC}"
npm install --save-dev gh-pages

echo ""
echo -e "${AMARELO}[5/5] Fazendo deploy para GitHub Pages...${NC}"
npx gh-pages -d dist

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${VERMELHO}=========================================${NC}"
    echo -e "${VERMELHO}  DEPLOY FALHOU${NC}"
    echo -e "${VERMELHO}=========================================${NC}"
    echo ""
    echo "Possiveis causas:"
    echo "  1. O repositorio nao existe no GitHub"
    echo "  2. Voce nao tem permissao de acesso"
    echo ""
    echo "SOLUCAO:"
    echo "  1. Crie o repositorio '$REPO_NAME' em:"
    echo "     https://github.com/new"
    echo "  2. Nao inicialize com README"
    echo "  3. Rode este script novamente"
    echo ""
    exit 1
fi

# ============================================
# SUCESSO!
# ============================================
echo ""
echo -e "${VERDE}=========================================${NC}"
echo -e "${VERDE}  DEPLOY REALIZADO COM SUCESSO!${NC}"
echo -e "${VERDE}=========================================${NC}"
echo ""
echo -e "${AZUL}Seu site esta disponivel em:${NC}"
echo -e "${AZUL}  https://$GITHUB_USER.github.io/$REPO_NAME/${NC}"
echo ""
echo -e "${AMARELO}Aguarde 1-2 minutos para o GitHub Pages atualizar.${NC}"
echo ""
