# Documentação do Fluxo e Arquitetura do Aplicativo

Este documento tem como objetivo detalhar a estrutura, a arquitetura de navegação e o fluxo de interação do usuário no aplicativo **SaaS Aluguel de Quadras**, servindo como material de apoio para a escrita do Trabalho de Conclusão de Curso (TCC).

---

## 1. Visão Geral do Sistema

O aplicativo é um *Software as a Service (SaaS)* voltado para a conexão entre proprietários de quadras esportivas (locadores) e usuários interessados em praticar esportes (locatários). Ele atua como uma plataforma centralizada de **busca, agendamento e gestão financeira** de locações.

O sistema possui duas frentes principais unificadas no mesmo aplicativo:
1. **Visão do Locatário (Jogador):** Busca de quadras, visualização de detalhes, reserva de horários e gestão do saldo na carteira virtual.
2. **Visão do Locador (Proprietário):** Cadastro de novas quadras, edição, gerenciamento das quadras cadastradas e acompanhamento das reservas recebidas.

---

## 2. Arquitetura de Navegação

A navegação foi construída utilizando a biblioteca **React Navigation**, baseada em um padrão de pilhas (`Stack Navigation`) e abas (`Tab Navigation`). O fluxo de navegação garante que telas que requerem autenticação sejam isoladas e protegidas.

### 2.1. Telas de Raiz (Root Stack)
As rotas principais do aplicativo são orquestradas pelo `StackNavigator`, que define os fluxos lineares e as sobreposições (modais):

* `Splash`: Tela inicial de carregamento. Onde geralmente ocorre a verificação se o usuário já possui um *token* de sessão válido.
* `Auth`: Tela de login, onde o usuário insere suas credenciais.
* `SignUp`: Tela de criação de uma nova conta no sistema.
* `TabNavigator`: Navegador aninhado que abriga as rotas principais pós-login (Home, Busca, Perfil, etc).

### 2.2. Telas Internas e Modais
O Stack também comporta telas de detalhamento e ações específicas que sobrepõem o fluxo das abas:
* `QuadraDetails`: Exibe as informações completas, fotos e horários de uma quadra específica.
* `PublishQuadra` e `EditCourt`: Telas dedicadas para criação e edição do anúncio de uma quadra.
* `MyCourts`: Dashboard para os proprietários listarem e gerenciarem suas propriedades.
* `QuadraReservas` e `MyReservas`: Gerenciamento das reservas. A primeira é focada na quadra (visão dono) e a segunda focada no usuário (visão jogador).
* `AddFunds`: Tela em formato de modal para o usuário adicionar saldo à sua carteira, viabilizando o pagamento das reservas.
* `Notifications`: Central de notificações do usuário.

---

## 3. Mapeamento do Fluxo do Usuário (User Journey)

### A. Fluxo de Entrada e Autenticação
1. O usuário abre o aplicativo e visualiza a tela de **Splash**.
2. O contexto da aplicação (`AuthProvider`) verifica se existe uma sessão ativa no **Supabase**.
   - Se **sim**, o usuário é direcionado para a tela principal (`TabNavigator`).
   - Se **não**, o usuário é direcionado para a tela de **Login** (`Auth`).
3. Na tela de Login, o usuário pode se autenticar ou navegar para a tela de **Cadastro** (`SignUp`).

### B. Fluxo de Busca e Reserva (Locatário)
1. O usuário autenticado acessa a tela **Home** ou a tela de **Busca**, onde tem acesso ao catálogo de quadras cadastradas.
2. Ao clicar em uma quadra, o fluxo é redirecionado para a tela `QuadraDetails`.
3. Para realizar a reserva, o aplicativo valida o saldo do usuário.
4. Se o saldo for insuficiente, o usuário pode acessar a tela de `AddFunds` (Adicionar Fundos) para realizar uma recarga na carteira.
5. Com a reserva confirmada, a partida aparece na listagem de `MyReservas` (Minhas Reservas).

### C. Fluxo de Gestão e Publicação (Locador)
1. Através de um menu ou aba específica (geralmente no *Profile*), o usuário pode acessar a área de proprietários.
2. Na tela `PublishQuadra`, ele preenche os dados (nome, preço, fotos, localização, infraestrutura) para cadastrar um novo espaço.
3. Para gerenciar seu negócio, ele acessa `MyCourts` (Minhas Quadras).
4. De dentro de `MyCourts`, ele pode:
   - Clicar em uma quadra e abrir a tela `EditCourt` para atualizar dados do anúncio.
   - Clicar para ver a agenda, abrindo a tela `QuadraReservas`, onde terá o relatório e controle dos horários alugados para aquela quadra específica.

---

## 4. Gestão de Estado e Backend

Para garantir que o fluxo acima funcione de maneira assíncrona e em tempo real:
- **Backend as a Service (BaaS):** O projeto emprega o **Supabase**, utilizando seu módulo de autenticação (`Supabase Auth`) para proteger o fluxo de usuários, e seu banco de dados PostgreSQL para relacionar Usuários, Quadras, Reservas e Transações Financeiras (Saldo).
- **Context API (`AuthProvider`, `AppModalProvider`):** O estado global do usuário (se está logado, dados de perfil, saldo) e os controles de interface globais (modais de alerta ou carregamento) são gerenciados por Contextos do React, envolvendo toda a árvore de componentes desde o `App.tsx`.

---

## 5. Próximos Passos (Sugestão para o TCC)
*Você pode utilizar essa estrutura no seu documento do TCC para a seção de "Projeto e Arquitetura do Sistema". Recomendamos criar diagramas de bloco (como UML, Diagrama de Classes e Diagrama de Casos de Uso) baseados neste texto para enriquecer visualmente a sua monografia.*
