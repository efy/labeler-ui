# Challenge

## Objective

Develop a front-end widget and server solution with the following capabilities:

1. ✅ Data input: The interface expects free-form text as input (e.g. “I want to...”). In
addition, spans of the text may be annotated with labels according to 4 categories
(ORG, City, Time, MISC). Each span may only take a single label.
2. ✅  Real-Time Interaction: Create a dynamic user interface that allows real-time data
entry and annotation without page reloads.
3. ✅ Data Navigation: Users should be able to add and navigate through data records
(previous and next) while saving any data inserted prior.
4. ❌ Data Export: Incorporate a functionality to export annotated data as a JSON Lines file in the client.

## Requirements
- Documentation: Comprehensive documentation is essential. Include clear
explanations of your design choices and assumptions.
- Light Server Architecture: Implement a lightweight server that handles data storage
in-memory or as a JSON file.
- Setup: Provide a setup script to install any dependencies on a clean Ubuntu machine.
- Initialisation: A single command should create the app and server. This should be
accessible via a local browser upon creation. 
- Assumptions: It’s acceptable to make assumptions to streamline development, but
they must be well-justified and geared towards creating a durable, scalable software
solution.

## Solution

I decided to use react with Next.js and Mantine UI as this supports things im currently learning and messing around with. My aim was to hack the thing together e2e and have persistance with SQLite and litestream replication again this was mostly to support other ideas and not really pragmatic thing for this tech test.

I split the task creation and labeling into two stages. This was to simplify labeling UI and allow for more efficientcey tasks foccused purely on labeling.

## Structure
- `common/types.ts` - documents the domain
- `services/` - contains client and server implementations
- `app/api/*` - Next.js API routes that connects task server to HTTP 
- `app/pages/*` - Next.js UI routes 
- `components/EntityLabeler` - component for handling labeling

### Process
1. Figured i'd approach in the following order `data model > api > ui`. 
2. I wrote a basic model description inside `common/types.ts`. The core model is `Task` which has 2 generic blobs for `data` and `annotations`. Data can be anything and annotations are likely to be structured data but could differ depending on what `data` contains e.g. text vs image. There are some other fields for workflow management.
3. Fed the typescript model into `Cursor` with prompt to generate SQlite + Next.js based implementation of from the typescript model. Also prompted to create a client implementation against the generated HTTP interface.
4. The LLM didnt do a terrible job but ended up with more normalisition than I'd like `TextAnnotations` ended up normalised as well as Enums being converted to tables. It also done a slightly wierd job of implementing the server side `TaskService` duplicating query code into endpoints and a `db/db.ts` file... i ended up implementing API routes by hand. And fixed up other weirdness. It did a decent job of creating the client implementation. I'd wanted it to do similar with the server model. For example 
```
class TaskClient implements TaskService {
  constructor(baseUrl: string)
  ...
}

class TaskServer implements TaskService {
  constructor(dbClient: sqlite3.Database)
  ...
}
```
maybe something to refactor if there's time 


5. hacked together basic workflow UI for:
    - Task creation at `/tasks/create`
    - Task view / edit (the actual labeling part) `/task/${taskId}`

6. Build labeling UI component
    - render text + annotations (`<AnnotatedText text={...} annotations={...}>`) 
      1. split text based on `[start, end]` pairs from annotations. So `I am Shaun` with a good annotation would become `['I am ', 'Shaun']`. With some metadata on each part for rendering purposes: `[{text: 'I am ', label: null}, {text: 'Shaun', label: 'Person'}]`
      2. render that format with a span
    - add text selection and dropdown at selection location

7. Gave up on 6 not enough time to get something working e2e and handle UI edgecases. Use some annotation lib for annotation
8. got annotation working.. try and make it look nicer with colors and clean up / simplify code
9. got the label colors lined up using the mantine theme colors knocked back to a lighter variant for highlighting.
10. deployment / ci stuff. huge faff as usual


# Mantine Next.js template

This is a template for [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/).
If you want to use pages router instead, see [next-pages-template](https://github.com/mantinedev/next-pages-template).

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
