---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Treinamento 2026
  Apresentação sobre a arquitetura e ecossistema do projeto.
drawings:
  persist: false
transition: slide-left
title: Treinamento Quati 2026
mdc: true
colorSchema: dark
---

# Treinamento 2026

Arquitetura, Ecossistema e Boas Práticas

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?technology
---

# Módulo 1
## A "Big Picture" e Fundamentos

---

# A Importância do Design System

Consistência, Manuseabilidade e Identidade.

> "A Design System is not a project, it's a product serving products."

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

### 🎨 Preservação da Identidade
- **Respeito aos Tokens**: Cores, Tipografia e Espaçamentos não são aleatórios.
- **Identidade Visual**: O Quati DS carrega a identidade da marca. Alterar cores "na mão" quebra essa identidade.
- **Padrões**: Seguir os padrões garante que o usuário se sinta em casa.

</div>

<div>

### 🛠️ Eficiência e Engenharia
- **Não Reinvente a Roda**: Use componentes prontos para focar no negócio.
- **Manutenibilidade**: Mudanças globais (ex: Rebranding) são triviais se usarmos tokens.
- **Evite Hardcoded**: `color: #123456` é débito técnico. `color: var(--color-primary)` é futuro.

</div>

</div>

---

# Atomic Design

Uma Metodologia Mental

> "We're not designing pages, we're designing systems of components." — [Brad Frost](https://atomicdesign.bradfrost.com/)

Inspirado na química, o Atomic Design nos ajuda a criar interfaces consistentes e escaláveis, partindo do menor elemento indivisível até a aplicação completa.

<div class="flex justify-center mt-10 gap-4 opacity-80">
  <div class="text-center">⚛️<br>Átomos</div>
  <div class="text-center">⚗️<br>Moléculas</div>
  <div class="text-center">🧬<br>Organismos</div>
  <div class="text-center">📄<br>Templates</div>
  <div class="text-center">🖥️<br>Páginas</div>
</div>

---

# 1. Átomos

A menor unidade da interface. Não podem ser quebrados sem perder sua funcionalidade.

**Exemplos**: Buttons, Inputs, Labels, Ícones, Cores (Tokens).

```tsx
// Atom: Button.tsx
// Focado em: Estilo Global, Variantes, Estados (Hover, Disabled)
export const Button = ({ variant = 'primary', ...props }) => {
  return <button className={`btn-${variant}`} {...props} />
}

// Uso
<Button>Enviar</Button>
```

---

# 2. Moléculas

Um grupo de átomos unidos funcionando como uma unidade. Fazem uma coisa simples e bem feita.

**Exemplo**: Search Form (Input + Button + Label).

```tsx
// Molecule: SearchForm.tsx
// Focado em: Composição Simples
export const SearchForm = ({ onSearch }) => (
  <form onSubmit={onSearch} class="flex gap-2">
    <Label>Buscar usuário</Label>
    <Input placeholder="John Doe" />
    <Button type="submit">🔍</Button>
  </form>
)
```

---

# 3. Organismos

Componentes complexos compostos por grupos de moléculas e/ou átomos e/ou outros organismos. Formam seções distintas de uma interface.

**Exemplo**: Header da aplicação (Logo + Search Form + Navigation + User Profile).

```tsx
// Organism: Header.tsx
// Focado em: Contexto da Aplicação, Layout de Seção
export const Header = ({ user }) => (
  <header class="flex justify-between p-4">
    <Logo />
    <div class="flex gap-4">
      <SearchForm /> {/* Molécula */}
      <Navigation /> {/* Molécula */}
    </div>
    <UserMenu user={user} /> {/* Molécula */}
  </header>
)
```

---

# 4. Templates & Páginas

O esqueleto e o conteúdo real.

<div class="grid grid-cols-2 gap-8">

<div>

### Templates
Estrutura de layout focada no "como" os componentes se organizam, sem dados reais.

```tsx
// Template: DashboardLayout.tsx
export const DashboardLayout = ({ 
  sidebar, 
  header, 
  content 
}) => (
  <div class="grid-layout">
    <asise>{sidebar}</aside>
    <main>
      {header}
      <div class="p-6">{content}</div>
    </main>
  </div>
)
```

</div>

<div>

### Páginas
Instância específica de um template com dados reais.

```tsx
// Page: DashboardHome.tsx
export const DashboardHome = () => {
  const { user } = useAuth()
  return (
    <DashboardLayout
      sidebar={<AppSidebar />}
      header={<Header user={user} />}
      content={<ChartsGrid />}
    />
  )
}
```

</div>

</div>

---

# Arquitetura Quati & Design System

Como aplicamos isso na prática com **Quati DS**?

1.  **Átomos**: Geralmente vêm prontos do `@cpqd-quati/react` (ex: `Button`, `TextField`). Não recriamos.
2.  **Moléculas/Organismos**: Criamos na pasta `src/App/components`.
    *   *Pragmatismo*: Não separamos pastas `atoms/`, `molecules/`, `organisms/` para evitar "paralisia de classificação". Tudo vive em `components/` agrupado por domínio/feature.
3.  **Templates**: Vivem em `src/App/templates`.
4.  **Páginas**: Vivem em `src/routes` (TanStack Router).

<div class="mt-8 p-4 border rounded border-gray-500 bg-gray-900/50 text-sm">
  <strong>💡 Regra de Ouro:</strong> Se um componente começa a ficar muito complexo para configurar, provavelmente ele é um Organismo tentando fazer papel de Template, ou um Organismo com responsabilidades demais. Quebre-o.
</div>

---

# Estrutura de Pastas na Prática

Visualizando a organização.

```text
src/
├── App/
│   ├── components/         # Moléculas e Organismos
│   │   ├── UserCard/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── Header.tsx
│   ├── templates/          # Estruturas de Layout
│   │   ├── Dashboard/
│   │   │   └── index.tsx
│   │   └── AuthLayout.tsx
│   ├── hooks/
│   └── utils/
├── pages/                  # Lógica de Negócio + Composição
│   └── DashboardHome.tsx
├── routes/                 # Páginas (TanStack Router)
│   ├── __root.tsx
│   ├── index.tsx
│   └── dashboard.tsx
└── main.tsx
```



---


# Documentação Oficial Quati

Onde encontrar a verdade.

- **Portal Quati**: [quati.cpqd.com.br](https://quati.cpqd.com.br/)
  - Visão geral, componentes, changelog e novidades.
- **Design Guidelines**: [quati.cpqd.com.br/design](http://quati.cpqd.com.br/design)
  - Princípios de design, uso de cores, tipografia e acessibilidade.

---

# Bibliotecas do Ecossistema

Ferramentas e bibliotecas que compõem o Quati.

<div class="grid grid-cols-3 gap-4 mt-8">

<div>
<h3>⚛️ Quati React</h3>
<p class="text-sm opacity-80">Componentes UI prontos para uso.</p>
<a href="https://quati.cpqd.com.br/react" class="text-xs text-blue-400">quati.cpqd.com.br/react</a>
</div>

<div>
<h3>🎨 Quati Tokens</h3>
<p class="text-sm opacity-80">Design tokens (cores, espaçamentos).</p>
<a href="https://bitbucket.cpqd.com.br/pages/GESU/front-docs/master/browse/quati-tokens/intro" class="text-xs text-blue-400">Docs (Bitbucket)</a>
</div>

<div>
<h3>🧩 Quati Icons</h3>
<p class="text-sm opacity-80">Ícones SVG padronizados.</p>
<a href="https://bitbucket.cpqd.com.br/pages/GESU/front-docs/master/browse/quati-icons/intro" class="text-xs text-blue-400">Docs (Bitbucket)</a>
</div>

</div>

---

# Repositórios (Bitbucket)

O código fonte de tudo.

- **Quati React**: [projects/GESU/repos/quati-react](https://bitbucket.cpqd.com.br/projects/GESU/repos/quati-react/browse)
- **Quati Tokens**: [projects/GESU/repos/quati-tokens](https://bitbucket.cpqd.com.br/projects/GESU/repos/quati-tokens/browse)
- **Quati Icons**: [projects/GESU/repos/quati-react-icons](https://bitbucket.cpqd.com.br/projects/GESU/repos/quati-react-icons/browse)

---

# Inner Source

Colaboração além das fronteiras do time.

> "Todo dev que tiver demandas é livre para abrir Pull Request."

1.  **Alinhamento**: Converse com o time do Quati (Designers/Devs) sobre sua necessidade.
2.  **Jira**: Abra um ticket descrevendo a proposta.
3.  **Pull Request**: Contribua com código! Melhorias e correções são bem-vindas.

<div class="mt-4 p-4 border rounded border-green-500 bg-green-900/20 text-sm">
  <strong>🤝 Cultura de Contribuição:</strong> O Quati é construído por todos nós. Se algo falta, você pode construir.
</div>

---

# O Ecossistema (Agenda)

Principais Tecnologias e Ferramentas

- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática
- **[React](https://react.dev/)**: Biblioteca de UI
- **[TanStack Router](https://tanstack.com/router/latest)**: Navegação
- **[TanStack Query](https://tanstack.com/query/latest)**: Server State
- **[Zod](https://zod.dev/)**: Validação
- **[React Hook Form](https://react-hook-form.com/)**: Formulários

---

# TypeScript

[Documentação Oficial](https://www.typescriptlang.org/)

Superset de JavaScript que adiciona tipagem estática. O "Strict Mode" nos ajuda a capturar erros em tempo de compilação, antes mesmo de rodar o código.

```ts
interface User {
  id: number;
  name: string;
}

function greeting(user: User) {
  return `Hello, ${user.name}`;
}
```

---

# React

[Documentação Oficial](https://react.dev/)

Biblioteca para construção de interfaces baseada em componentes. O padrão de mercado para SPAs modernas, focada em declaratividade e composição.

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

---

# TanStack Router

[Documentação Oficial](https://tanstack.com/router/latest)

Router moderno com Type-Safety de ponta a ponta. Gerencia URL state (search params) e loaders nativamente, garantindo que rotas e parâmetros sejam validados pelo compilador.

```tsx
// Definição da rota com loader
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => fetchPost(params.postId),
})
```

---

# TanStack Router: File Based Routing

A estrutura de arquivos define suas rotas automaticamente.

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

### Como funciona
- Arquivos em `src/routes` mapeiam para URLs.
- `__root.tsx`: Layout raiz (envolve toda a app).
- `index.tsx`: Rota raiz (`/`).
- Pastas ou nomes com `.` criam aninhamento.
- `$` indica parâmetros dinâmicos.

</div>

<div>

### Estrutura Visual

```text
src/routes/
├── __root.tsx      # Layout Global
├── index.tsx       # /
├── about.tsx       # /about
├── posts/
│   ├── index.tsx   # /posts
│   ├── $postId.tsx # /posts/123
│   └── create.tsx  # /posts/create
└── settings.
    └── profile.tsx # /settings/profile
```

</div>

</div>

---

# TanStack Query: useQuery

[Documentação Oficial](https://tanstack.com/query/latest)

Gerencia leitura de dados (GET). Lida nativamente com estados de carregamento, erro e atualização.

```tsx {all|1|5-6|8}
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 5, // 5 minutos
  refetchOnWindowFocus: false, // evita refetch ao trocar de aba
})

if (isLoading) return <Spinner />
if (isError) return <Error message={error.message} />

return (
  <div>
    <button onClick={() => refetch()}>Atualizar</button>
    {data.map(todo => <Todo key={todo.id} {...todo} />)}
  </div>
)
```

---

# TanStack Query: useMutation

Para criar, atualizar ou deletar dados (POST, PUT, DELETE).

```tsx {all|1,13|2-10}
const mutation = useMutation({
  mutationFn: (newTodo) => axios.post('/todos', newTodo),
  onSuccess: () => {
    // Invalida e refaz o fetch da lista de todos
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    toast.success("Todo criado!")
  },
  onError: (error) => {
    toast.error(`Erro: ${error.message}`)
  }
})

return (
  <button 
    disabled={mutation.isPending}
    onClick={() => mutation.mutate({ title: 'Novo Todo' })}
  >
    {mutation.isPending ? 'Criando...' : 'Criar Tarefa'}
  </button>
)
```

---

# Zod

[Documentação Oficial](https://zod.dev/)

Declaração de schemas e validação de dados em runtime (schema-first). Integração perfeita com TypeScript, permitindo inferir tipos estáticos a partir dos validadores.

```ts
const UserSchema = z.object({
  username: z.string().min(3),
  age: z.number().positive(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;
```

---

# React Hook Form

[Documentação Oficial](https://react-hook-form.com/)

Biblioteca leve e performática para formulários. Reduz a renderização desnecessária usando componentes não controlados e se integra facilmente com bibliotecas de validação como Zod.

```tsx
const { register, handleSubmit } = useForm();
const onSubmit = data => console.log(data);

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("firstName")} />
  <input type="submit" />
</form>
```


---
---

# A "Big Picture" na Prática

Todas as peças trabalhando juntas em uma tela de edição.

<div class="overflow-y-auto h-[450px] pr-4">

```tsx {all|1-3|5-8|11-13|16-19|22-25|28-32}
// 1. Contrato de Dados (Zod)
const schema = z.object({ title: z.string().min(3) })
type Form = z.infer<typeof schema>

// 2. Rota e Loader (TanStack Router)
export const Route = createFileRoute('/posts/$id/edit')({
  loader: ({ params }) => getPost(params.id), // Fetch inicial seguro
  component: EditPost
})

function EditPost() {
  // 3. Acesso aos Dados (Router + Query)
  const { id } = Route.useParams() // Type-safe params!
  const { data: post } = useSuspenseQuery(postBriefOptions(id))

  // 4. Setup do Form (RHF + Zod)
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: post // "Hydrate" com dados do server
  })

  // 5. Mutação e Navegação
  const mutation = useMutation({
    mutationFn: (data) => updatePost(id, data),
    onSuccess: () => Route.navigate({ to: '/posts' })
  })

  // 6. UI Declarativa
  return (
    <form onSubmit={handleSubmit(d => mutation.mutate(d))}>
      <input {...register('title')} />
      <button disabled={mutation.isPending}>Salvar</button>
    </form>
  )
}
```

<div class="mt-4 text-sm opacity-70">
  Neste exemplo vemos: Validação, Roteamento Seguro, Server State, Gerenciamento de Formulário e Mutação integrados.
</div>

</div>

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?code
---

# Módulo 2
## Navegação e Gerenciamento de Estado

---

# Agenda: Módulo 2

O que vamos cobrir neste módulo técnico.

1.  **Navegação Type-Safe**: TanStack Router.
2.  **Gerenciamento de Estado**: Server State vs Client State.
3.  **Emissão de Eventos**: Arquitetura orientada a eventos (EDA).

---

# TanStack Router: Segurança (Type Safety)

O compilador conhece todas as suas rotas.

```tsx
// ❌ Erro de TS: Rota não existe
<Link to="/rota-inexistente" />

// ❌ Erro de TS: Faltando parâmetros
<Link to="/posts/$postId" />

// ✅ Correto: Autocomplete e validação de params
<Link 
  to="/posts/$postId" 
  params={{ postId: '123' }} 
>
  Ver Post
</Link>
```

---

# TanStack Router: Search Params

Estado da URL gerenciado e validado como **Primeira Classe**.

```tsx {all|2-5|8}
export const Route = createFileRoute('/posts/')({
  // Validação (Zod): Transforma URL string em Tipos
  validateSearch: z.object({
    page: z.number().catch(1), // /posts?page=2
    q: z.string().optional(),  // /posts?q=react
  }),
})

function PostsList() {
  // Acesso totalmente tipado!
  const { page, q } = Route.useSearch() 
  
  return <div>Página: {page}</div>
}
```

---

# TanStack Router: Loaders

*Fetch-then-render*: Os dados começam a carregar assim que você clica no link, antes mesmo da nova página renderizar.

```tsx {all|2|5-7}
export const Route = createFileRoute('/posts/$postId')({
  // Executa em paralelo ao carregamento do bundle da página
  loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

function PostComponent() {
  // Dados já estão prontos quando o componente monta!
  const post = Route.useLoaderData()
  return <div>{post.title}</div>
}
```

---

# TanStack React Query

Server State vs. Client State

<div class="grid grid-cols-2 gap-10">

<div>
  <h3>Client State</h3>
  <p class="opacity-75">UI efêmera</p>
  <ul>
    <li>useState</li>
    <li>useReducer</li>
    <li>Modais, Inputs, Accordions</li>
  </ul>
</div>

<div>
  <h3>Server State</h3>
  <p class="opacity-75">Dados da API</p>
  <ul>
    <li>React Query</li>
    <li>Cache, Deduplicação</li>
    <li>Dados compartilhados</li>
  </ul>
</div>

</div>

<div class="mt-8">

**Conceitos Chave:**
`staleTime`, `cacheTime`, `invalidação de queries`, `atualizações otimistas`.

</div>

---

# Emissão de Eventos (EDA)

Comunicação desacoplada entre componentes.

Utilizamos uma arquitetura orientada a eventos para permitir que ações propaguem efeitos colaterais pela aplicação sem prop-drilling excessivo.

### Estrutura Base (`src/common/events`)

- **`events.ts`**: Constantes exportadas para garantir consistência.
- **`emitter.ts`**: Instância singleton do `fbemitter`.

```ts
// events.ts
export const EVENTS = {
  LOGOUT: 'APP_LOGOUT',
  TOAST_SHOW: 'UI_TOAST_SHOW',
  REFRESH_DATA: 'DATA_REFRESH_ALL'
} as const;

// emitter.ts
import { EventEmitter } from 'fbemitter';
export const AppEmitter = new EventEmitter();
```


---

# Arquitetura Orientada a Eventos (EDA)

O que é e de onde vem?

A web **É** orientada a eventos por natureza.
- O DOM dispara eventos o tempo todo: `click`, `submit`, `scroll`.
- O navegador reage a eventos de rede e lifecycle.

```js
// Exemplo Nativo Clássico
document.addEventListener('scroll', (event) => {
  console.log('O usuário rolou a página!', event);
});
```

**O Conceito:**
Em vez de Componente A chamar explicitamente Componente B (acoplamento forte), A "grita" (emite) que algo aconteceu, e quem estiver interessado (B, C, D) reage.

<div class="grid grid-cols-2 gap-8 mt-6 text-sm">
  <div class="p-4 border border-red-500 rounded bg-red-900/10">
    <h3 class="text-red-400">Acoplamento Forte (Imperativo)</h3>
    <p><code>Header</code> precisa saber que existe um <code>Sidebar</code> para chamar <code>sidebar.close()</code>.</p>
  </div>
  <div class="p-4 border border-green-500 rounded bg-green-900/10">
    <h3 class="text-green-400">Desacoplamento (Reativo)</h3>
    <p><code>Header</code> emite <code>MENU_CLICKED</code>. <code>Sidebar</code> ouve e fecha.</p>
  </div>
</div>

---

# Por que utilizamos?

Escalabilidade de Lógica

1.  **Evita Prop Drilling Massivo**: Não precisamos passar funções de callback por 10 níveis de componentes.
2.  **Separação de Responsabilidades**: O botão de "Logout" não precisa saber limpar o LocalStorage, redirecionar rota e mostrar Toast. Ele só avisa: "O usuário quis sair".
3.  **Cross-Cutting Concerns**: Logs, Analytics e Notificações podem "ouvir" ações de negócio sem poluir o código das features.

---


# Pattern: Event Listeners

Componentes "invisíveis" que gerenciam reações.

Ao invés de espalhar `useEffect` por toda a aplicação, concentramos a lógica em "Brokers" ou Listeners específicos que retornam `null`.

<div class="overflow-y-auto h-[400px] pr-4">

```tsx {all|1-4|6-15|18-30|all}
// AuthEventListener.tsx
// Responsável apenas por ouvir eventos de logout/sessão
export function AuthEventListener() {
  const navigate = useNavigate()

  useEffect(() => {
    const subscription = AppEmitter.addListener(EVENTS.LOGOUT, () => {
      clearStorage();
      navigate({ to: '/login' });
    });

    return () => subscription.remove();
  }, [navigate]);

  return null; // Não renderiza nada visualmente
}

// MainEventListener.tsx
// Agrupa todos os listeners em um único ponto na raiz do App
export function MainEventListener() {
  return (
    <>
      <AuthEventListener />
      <ToastEventListener />
      <NotificationEventListener />
    </>
  )
}
```

</div>

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?form
---

# Módulo 3
## Formulários à Prova de Balas

---

# O Fluxo da Validação com Zod

Definindo o contrato do dado primeiro.

```ts {all|1-5|7}
import { z } from 'zod'

const cadastroSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirm: z.string()
}).refine(data => data.password === data.confirm, {
  message: "Senhas não conferem",
  path: ["confirm"]
})

// Inferência de Tipos Automática
type CadastroForm = z.infer<typeof cadastroSchema> 
// 🎉 Adeus duplicação de interfaces!
```

---
layout: two-cols
---

# React Hook Form

**Uncontrolled Components**
- Melhor performance
- Menos re-renders que `useState`
- Integração via `zodResolver`

::right::

<div class="ml-4">

**Exemplo Prático**

```tsx
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("email")} />
    {/* RHF gerencia o estado */}
  </form>
)
```

</div>

---

# Antes vs Depois

Simplificando com RHF + Zod

<div class="grid grid-cols-2 gap-4 text-xs">

<div>
<strong>Antes (Complexo & Verboso)</strong>

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email.includes('@')) {
    setError('Inválido');
    return;
  }
  // submit...
}

<input 
  value={email} 
  onChange={e => setEmail(e.target.value)} 
/>
```
</div>

<div>
<strong>Depois (Declarativo)</strong>

```tsx
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});

<input {...register("email")} />
<span>{errors.email?.message}</span>
```
</div>

</div>

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?design
---

# Módulo 4
## Quati DS e Estilização

---

# Consumo do Quati DS

Conveniência e Padronização

- **Importação Direta**: `import { Button } from '@quati/ds'`
- **Design Tokens**: Acesso a cores, tipografia e espaçamentos padronizados.
- **Customização**:
  - ✅ Permitido: Ajustes de layout e posicionamento.
  - ❌ Evitar: Alterar cores de status ou tipografia base.

---

# Responsividade e Temas

Padrões adotados

1. **Breakpoints**: Mobile-first (padrão) -> Tablet -> Desktop.
2. **Temas**: Atualmente suportamos apenas o tema **Light**. Dark mode está no roadmap.
3. **Consistência**: Use as variáveis CSS ou utilitários do DS para manter a harmonia visual.

---

# Continua na Próxima Aula...

Construção de Aplicação Real

Hoje focamos nos **fundamentos** e na **arquitetura**.

🚀 **Amanhã**:
- Vamos construir uma aplicação completa do zero.
- Integrar todos os conceitos: Router, Query, Forms e Design System.
- Aprofundar em responsividade e casos de uso complexos.

Preparem suas máquinas!

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?folder
---

# Módulo 5
## Estrutura de Pastas

---
layout: two-cols
---

# Estrutura Proposta

Organização lógica e escalável.

- **`src/App/components`**: Moléculas e Organismos reutilizáveis.
- **`src/App/templates`**: Estruturas de Layout macro.
- **`src/pages`**: Lógica de Negócio e Composição.
- **`src/routes`**: Definições do TanStack Router (File-System Routing).
- **`src/server`**: Configurações de API e React Query.
- **`src/common`**: `events`, `logger`, `utils` e configurações globais.

::right::

# Nomenclatura

Convenções de Arquivos (Pattern: Angular-like).

- **Sufixos explícitos de tipo**: Ajuda na busca e identificação rápida.
  - `User.Service.ts`
  - `Header.Component.tsx`
  - `Login.Page.tsx`
- **Hooks**: Padrão React (`useAuth.ts`).
- **PascalCase**: Para arquivos de Classes e Componentes.
- **Exports**: Preferência por **Named Exports**.

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?screen
---

# Módulo 6
## Ferramentas e Debugging

---

# Estratégia de Logging

Observabilidade no Client-Side.

Utilizamos uma instância configurada do `Logger` (baseado no **Pino**) para manter logs estruturados e consistentes, evitando `console.log` espalhados.

```ts
// Uso recomendado
import { Logger } from '@/common/logger';

// ✅ Logs estruturados com contexto
Logger.info('Usuário logado', { userId: 123, role: 'admin' });

// ❌ Evitar
console.log('Logou', user);
```

**Por que?**
- Permite filtrar logs por nível (INFO, WARN, ERROR).
- Facilita a integração com ferramentas de monitoramento (ex: Datadog, Sentry) no futuro.
- Mantém o console limpo em produção.

---

# Browser DevTools & Network

Dominando o ambiente de execução.

**O que vamos demonstrar agora:**

1.  🐞 **Debugger**: Breakpoints, Step Over/Into.
2.  🌐 **Network**: Inspecionar Payloads, Headers e Respostas de API.
3.  📂 **Sources**: Navegar e editar arquivos diretamente no navegador.

<div class="mt-8 p-4 border rounded border-blue-500 bg-blue-900/20 text-sm">
  <strong>Demo Prática:</strong> Vamos abrir o arquivo <code>debug-demo.html</code> e "caçar bugs" juntos.
</div>

---
layout: cover
background: https://source.unsplash.com/random/1920x1080?screen
---

# Módulo 7
## Mão na Massa (Live Coding)

---

# Desafio: Dashboard de Observabilidade

**Missão**: Construir o "Sistema de Operações" simplificado.

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

### 🎯 Objetivos
1.  **O Sistema Nervoso**: Configurar `Emitter` para eventos globais.
2.  **A Caixa Preta**: Implementar `Logger` com Pino.
3.  **A Sala de Controle**: Criar uma página consumindo Template e UI Kit.

</div>

<div>

### ⏱️ Tempo Estimado
**30 - 40 minutos**

Acompanhamento dinâmico:
-   **Nível 1**: Configuração básica (Emitter).
-   **Nível 2**: Implementação de Log (Logger).
-   **Nível 3**: Interface Visual (Page + Template).

</div>

</div>

<div class="mt-8 text-center text-sm opacity-60">
  Consulte o guia detalhado em <code>workshop/README.md</code>
</div>

---
layout: center
class: text-center
---

# Perguntas?

Obrigado!
