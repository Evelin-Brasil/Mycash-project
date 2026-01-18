# 💰 MyCash+ | Dashboard Financeiro

> Uma aplicação moderna para gestão financeira familiar, focada em simplicidade e visualização de dados.

## 📋 Sobre o Projeto

O **MyCash+** é um dashboard interativo desenvolvido para facilitar o controle financeiro. O objetivo principal foi criar uma interface rica (UI) e uma experiência de usuário (UX) fluida, permitindo visualizar receitas, despesas e o saldo familiar de forma clara e elegante.

Este projeto demonstra competências em desenvolvimento **Front-end Moderno**, integração com **APIs/Banco de Dados** e construção de layouts responsivos complexos.

## 🚀 Tecnologias Utilizadas

*   **⚛️ React.js (Vite)**: Framework principal para construção da interface.
*   **🔷 TypeScript**: Para tipagem estática e segurança do código.
*   **🎨 TailwindCSS**: Para estilização rápida, responsiva e efeitos visuais modernos (Blur, Gradients).
*   **🔥 Supabase**: Backend-as-a-Service (PostgreSQL) para persistência real dos dados.
*   **📊 Recharts**: Biblioteca para criação do gráfico financeiro mensal.
*   **🧩 Bibliotecas Auxiliares**: `date-fns` (datas), `lucide-react` (ícones), `clsx` (utilitários).

## ✨ Funcionalidades Principais

1.  **Dashboard Visual**:
    *   Cards de Balanço com animação de contagem (CountUp).
    *   Gráfico de Área para evolução de Receitas vs. Despesas.
    *   Indicadores visuais de tendência (ex: "+12% esse mês").

2.  **Gestão de Transações**:
    *   Listagem de movimentações recentes.
    *   Categorização por ícones e cores (ex: Moradia, Alimentação, Lazer).

3.  **Sidebar & Navegação**:
    *   Menu lateral retrátil (responsivo para mobile).
    *   Navegação entre Dashboard, Cartões e Perfil.

4.  **Perfil de Usuário**:
    *   Exibição dinâmica do usuário logado.
    *   Visualização de membros da família e suas rendas.

## 📱 Design & Responsividade

O projeto adota um design system consistente com uma paleta de cores focada no **Lime Green** (#CCFF00) para destaques e um fundo **Dark/Light** equilibrado para conforto visual. Totalmente adaptado para funcionar em celulares, tablets e desktops.

## 📦 Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/Evelin-Brasil/Mycash-project.git

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente (.env)
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_key_supabase

# 4. Rode o projeto
npm run dev
```

---
Desenvolvido por **Evelin Brasil** 🚀
