# SaaS Aluguel de Quadras (TCC App)

Aplicativo mobile desenvolvido em React Native com Expo para um sistema de aluguel de quadras esportivas (Software as a Service - SaaS). Este projeto utiliza Supabase como backend, gerenciando o banco de dados e a autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento mobile.
- **[Expo](https://expo.dev/)**: Plataforma e conjunto de ferramentas para aplicações React.
- **[Supabase](https://supabase.com/)**: Backend as a Service open-source (Banco de dados PostgreSQL e Autenticação).
- **[React Navigation](https://reactnavigation.org/)**: Navegação entre telas (Stack e Bottom Tabs).
- **[Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)**: Para animações fluidas na interface.
- **[Expo Google Fonts](https://github.com/expo/google-fonts)**: Utilização das fontes *Poppins* e *Rubik*.
- **TypeScript**: Tipagem estática para maior segurança e escalabilidade do código.

## 📁 Estrutura do Projeto

A base de código do projeto está organizada da seguinte maneira:

```text
SaaSAluguelDeQuadras/
├── App.tsx             # Arquivo raiz e ponto de entrada da aplicação
├── app.json            # Configurações gerais do Expo (nome, ícones, versão)
├── package.json        # Dependências e scripts do projeto
├── src/                # Código-fonte principal
│   ├── assets/         # Recursos estáticos como imagens e ícones
│   ├── components/     # Componentes de UI reutilizáveis (botões, cards, etc.)
│   ├── constants/      # Valores constantes (ex: paleta de cores, temas, URLs)
│   ├── contexts/       # Contextos globais (Context API), como gerenciamento de estado de usuário
│   ├── navigation/     # Configuração das rotas e dos navegadores (Stack, Tabs)
│   ├── screens/        # Telas da aplicação (ex: Auth, AddFunds, Home)
│   └── services/       # Serviços e integrações com APIs externas (Cliente Supabase)
└── supabase/           # Configurações, functions e possíveis migrações do Supabase
```

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/) (recomendado versão LTS)
- Gerenciador de pacotes (NPM ou Yarn)
- [Git](https://git-scm.com/)
- Aplicativo **Expo Go** no seu smartphone físico (disponível na App Store ou Google Play), ou um simulador/emulador configurado em seu computador.

## 🛠️ Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd SaaSAluguelDeQuadras
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure as Chaves do Supabase:**
   Para que a autenticação e o banco de dados funcionem, é necessário configurar as credenciais do Supabase. Verifique a configuração do cliente no diretório `src/services/` e insira sua `SUPABASE_URL` e `SUPABASE_ANON_KEY`.

5. **Inicie o servidor de desenvolvimento (Metro Bundler):**
   ```bash
   npm start
   # ou 
   npx expo start
   ```

6. **Acesse o Aplicativo:**
   - O comando acima exibirá um **QR Code** no terminal.
   - Abra o **Expo Go** no seu celular e escaneie o código.
   - Alternativamente, pressione `a` no terminal para abrir no emulador Android ou `i` para o simulador do iOS.

## 🔒 Funcionalidades Atuais

- **Autenticação de Usuários**: Integração nativa com Supabase Auth (Sign up / Sign in).
- **Gestão de Fundos**: Telas para gerenciamento de saldo e transações (ex: tela `AddFunds`).
- **Navegação Dinâmica**: Estruturada através do React Navigation para fluxo intuitivo entre autenticação e uso do App.

## 📜 Licença

Este projeto está sob a licença 0BSD.
