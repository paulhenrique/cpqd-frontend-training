
# 🛠️ Workshop: Dashboard de Observabilidade

Bem-vindo ao desafio prático! Hoje vamos construir um **Sistema de Operações** simplificado.

**Objetivo**: Criar uma aplicação onde podemos disparar alertas (Emitter), registrar logs (Logger) e visualizar isso em uma Dashboard (Page/Template).

---

## 🏗️ Atividade 1: O Sistema Nervoso (Emitter)

Para desacoplar a ação (clicar num botão) da reação (mostrar um toast, fazer log), usaremos Events.

**Tarefa**:
1.  Crie o arquivo: `src/common/config/events/emitter.ts`.
2.  Configure uma instância do `EventEmitter` (fbemitter).
3.  Crie um `MainEventListener` que será responsável por "ouvir" os eventos globais.
4.  Certifique-se de importar/chamar esse listener no `App.tsx` ou ponto de entrada.

*Dica*: Use o padrão Singleton para o Emitter.

---

## 📦 Atividade 2: A Caixa Preta (Logger)

Precisamos rastrear o que acontece no sistema.

**Tarefa**:
1.  Crie o arquivo: `src/common/config/tools/logger.ts`.
2.  Configure o **Pino** como nossa biblioteca de logs.
3.  O logger deve incluir automaticamente:
    -   Timestamp.
    -   Nível do log (info, warn, error).
    -   *Extra*: Uma string indicando o contexto ou localização (ex: `LoggerLocation`).

---

## 🖥️ Atividade 3: A Sala de Controle (Página)

Vamos dar vida ao sistema.

**Tarefa**:
1.  Crie uma nova página: `src/pages/ControlRoom.tsx` (ou similar).
2.  Esta página deve consumir um **Template** (pode ser um existente ou um novo simples).
3.  Implemente:
    -   **Botões de Pânico**: Botões que, ao serem clicados, disparam eventos via `Emitter`.
    -   **Display de Logs**: (Opcional/Avançado) Uma área que mostra os logs gerados.
4.  Use componentes do **Quati React** (`Button`, `Card`, `Typography`).

---

## 🚀 Bônus (Se sobrar tempo)

-   Conecte o `Logger` ao `Emitter`: Quando um evento crítico ocorrer, o Logger deve registrar automaticamente um erro.
-   Crie um Hook `useLogger` para facilitar o uso nos componentes.

**Boa sorte!** 🏹
