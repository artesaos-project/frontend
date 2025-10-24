# 🎨 Artesãos Project - Frontend

> Plataforma web para conectar artesãos e consumidores de produtos artesanais brasileiros.

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Desenvolvimento](#desenvolvimento)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)

---

## 🎯 Sobre o Projeto

O **Artesãos Project** é uma plataforma completa para artesãos brasileiros divulgarem e venderem seus produtos artesanais. O sistema inclui:

- **Portal público** com listagem de produtos e artesãos
- **Área de autenticação** (login/registro)
- **Painel de artesão** para gerenciar produtos e perfil
- **Painel de moderador** para aprovar cadastros e gerenciar denúncias
- **Sistema de busca e filtros** por categorias, técnicas e materiais

---

## 🚀 Tecnologias

### Core
- **[Next.js 15.2.3](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e sem estilo
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis baseados em Radix
- **[Lucide React](https://lucide.dev/)** - Ícones SVG
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de ícones

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração Zod + React Hook Form

### Estado & Dados
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado global
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições API
- **[React Select](https://react-select.com/)** - Select customizável

### Animações & UI/UX
- **[Swiper](https://swiperjs.com/)** - Carrosséis e sliders touch
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes
- **[tw-animate-css](https://www.npmjs.com/package/tw-animate-css)** - Animações CSS com Tailwind

### Qualidade de Código
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[TypeScript ESLint](https://typescript-eslint.io/)** - Regras ESLint para TypeScript

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** >= 18.0.0 (recomendado: v22.14.0)
- **[npm](https://www.npmjs.com/)** >= 9.0.0 ou **[yarn](https://yarnpkg.com/)** >= 1.22.0
- **[Git](https://git-scm.com/)** para clonar o repositório

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/marcus-santos/artesaos-project-web.git
cd artesaos-project-web
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

---

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Configure as variáveis necessárias:

```env
# API Backend URL
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"

# Outras variáveis (se necessário)
# NEXT_PUBLIC_MINIO_URL="http://localhost:9000"
```

### 2. Configuração de Imagens Externas

O projeto está configurado para aceitar imagens de:
- GitHub (`github.com`, `avatars.githubusercontent.com`)
- Placeholders (`placehold.co`)
- Servidor interno (`72.60.155.229:9000`)

Para adicionar novos domínios, edite `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-dominio.com',
    },
  ],
}
```

---

## 🏃 Como Executar

### Modo Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em **[http://localhost:3000](http://localhost:3000)**

> **Nota:** O projeto usa Turbopack para builds mais rápidas em desenvolvimento.

### Modo Produção

```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📁 Estrutura do Projeto

```
artesaos-project-web/
├── public/                      # Arquivos estáticos (imagens, SVGs)
│   ├── horizontal-logo-azul.svg
│   ├── auth-bg.svg
│   └── ...
├── src/
│   ├── app/                     # App Router do Next.js
│   │   ├── (site)/             # Grupo de rotas públicas
│   │   │   ├── page.tsx        # Página inicial
│   │   │   ├── artisan/        # Páginas de artesãos
│   │   │   ├── category/       # Páginas de categorias
│   │   │   ├── product/        # Páginas de produtos
│   │   │   └── config/         # Configurações do usuário
│   │   ├── auth/               # Autenticação (login/registro)
│   │   ├── moderator/          # Painel de moderação
│   │   ├── globals.css         # Estilos globais + Tailwind
│   │   ├── layout.tsx          # Layout raiz
│   │   └── not-found.tsx       # Página 404
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes shadcn/ui
│   │   ├── features/           # Componentes por feature
│   │   │   ├── home/           # Componentes da home
│   │   │   ├── artisan/        # Componentes do artesão
│   │   │   ├── moderator/      # Componentes do moderador
│   │   │   └── product/        # Componentes de produto
│   │   ├── common/             # Componentes compartilhados
│   │   ├── header.tsx          # Cabeçalho
│   │   └── footer.tsx          # Rodapé
│   ├── constants/              # Constantes da aplicação
│   │   ├── finalidades.ts      # Finalidades de produtos
│   │   ├── materia-prima.ts    # Materiais disponíveis
│   │   └── tecnicas.ts         # Técnicas artesanais
│   ├── db-mock/                # Dados mock para desenvolvimento
│   │   ├── artisans.json
│   │   ├── products.json
│   │   ├── categories.json
│   │   ├── reports.json        # Mock de denúncias
│   │   └── reports-detailed.json
│   ├── hooks/                  # Custom React Hooks
│   │   ├── use-artisan-register.ts
│   │   ├── use-product-form.ts
│   │   ├── use-store-user.ts   # Zustand store
│   │   └── ...
│   ├── lib/                    # Utilitários e helpers
│   │   ├── utils.ts            # Funções utilitárias
│   │   └── schemas/            # Schemas Zod
│   │       ├── login-schema.ts
│   │       ├── sign-up-schema.ts
│   │       └── artisan-profile-schema.ts
│   ├── services/               # Serviços e APIs
│   │   ├── api-service.ts      # Cliente HTTP base
│   │   └── api/
│   │       └── index.ts        # Endpoints da API
│   └── types/                  # Definições TypeScript
│       ├── artisan.ts
│       ├── product.ts
│       ├── report.ts
│       └── user-props.ts
├── .env                        # Variáveis de ambiente (não commitado)
├── .gitignore
├── components.json             # Configuração shadcn/ui
├── Dockerfile.frontend         # Container Docker
├── eslint.config.mts           # Configuração ESLint
├── next.config.ts              # Configuração Next.js
├── package.json                # Dependências e scripts
├── postcss.config.mjs          # Configuração PostCSS
├── tsconfig.json               # Configuração TypeScript
└── README.md                   # Este arquivo
```

---

## 🎨 Funcionalidades

### 🏠 Portal Público
- ✅ Página inicial com banner de novidades
- ✅ Listagem de produtos artesanais
- ✅ Slider de categorias
- ✅ Busca e filtros avançados
- ✅ Perfil público de artesãos
- ✅ Detalhes de produtos com galeria

### 🔐 Autenticação
- ✅ Login de usuários
- ✅ Registro de novos usuários
- ✅ Validação de formulários com Zod
- ✅ Gerenciamento de sessão

### 👤 Painel do Artesão
- ✅ Editar perfil do artesão
- ✅ Upload de fotos
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Gerenciar informações (técnicas, materiais, finalidades)

### 🛡️ Painel do Moderador
- ✅ Listagem de artesãos pendentes
- ✅ Aprovar/rejeitar cadastros
- ✅ Gerenciar denúncias
- ✅ Tabela responsiva com filtros
- ✅ Visualização detalhada de denúncias
- ✅ Sistema de status (Pendente/Moderado/Arquivado)

### 🎨 Design System
- ✅ Paleta de cores customizada (Dust, Midnight, Sakura, Solar, Mint, etc.)
- ✅ Componentes acessíveis (Radix UI)
- ✅ Totalmente responsivo (mobile-first)
- ✅ Animações e transições suaves
- ✅ Notificações toast

---

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run build` | Cria build de produção otimizado |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint para verificar código |

---

## 🛠️ Desenvolvimento

### Adicionando Novos Componentes shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

Exemplo:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
```

### Estrutura de Rotas

O projeto usa **App Router** do Next.js 15:

- `(site)` - Rotas públicas (agrupadas sem afetar URL)
- `auth` - Rotas de autenticação
- `moderator` - Rotas protegidas do moderador

### Dados Mock

Durante o desenvolvimento, utilize os arquivos em `src/db-mock/`:

```typescript
import reportsMock from '@/db-mock/reports.json';
import productsMock from '@/db-mock/products.json';
```

### Gerenciamento de Estado

O projeto usa **Zustand** para estado global:

```typescript
// hooks/use-store-user.ts
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### Chamadas de API

```typescript
import { userApi } from '@/services/api';

// Login
const response = await userApi.login({ email, password });

// Criar produto
const product = await productApi.create(productData);
```

---

## 🐳 Deploy

### Docker

O projeto inclui um `Dockerfile.frontend` para containerização:

```bash
# Build da imagem
docker build -t artesaos-frontend -f Dockerfile.frontend .

# Executar container
docker run -p 3000:3000 artesaos-frontend
```

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático a cada push

### Outras Plataformas

O projeto Next.js pode ser deployado em:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use **TypeScript** para type safety
- Siga o padrão **ESLint** configurado
- Utilize **Prettier** para formatação
- Componentes devem ser **funcionais** com hooks
- Nomes de arquivos em **kebab-case** ou **PascalCase** (componentes)

---

## 📝 Licença

Este projeto é privado e de propriedade de **Arteiros Caraguá**.

---

## 👥 Equipe

Desenvolvido por [Marcus Santos](https://github.com/marcus-santos)

---

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: sac@criarte.com.br
- 🐛 Issues: [GitHub Issues](https://github.com/marcus-santos/artesaos-project-web/issues)

---

## 🔗 Links Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Feito com ❤️ para artesãos brasileiros

</div>

