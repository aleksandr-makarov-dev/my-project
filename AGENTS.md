# MyProject Web Application

## Project

MyProject is a React + TypeScript application built with Vite.

Use the existing stack: React, TypeScript, Vite, TanStack Router,
TanStack Query, Axios, React Hook Form, Zod, Base UI, Tailwind CSS,
class-variance-authority, clsx, tailwind-merge, and dayjs.

Inspect package.json and the relevant source files before making changes.
Treat the installed dependencies and implementation as the source of truth.
Do not assume a library, script, or reference file exists merely because
it is mentioned in these instructions.

## Project structure

Application code lives under src:

- common/api: shared HTTP client, API error types, and infrastructure.
- common/components: reusable UI primitives.
- common/lib: shared utilities and infrastructure helpers.
- features/<feature>: domain types, validation, API functions, hooks,
  forms, and feature components.
- routes: TanStack Router route files and page orchestration.
- locales: English and Russian translations when localization is configured.
- i18n.ts: localization configuration when present.
- main.tsx: application entry point.
- routeTree.gen.ts: generated route tree.

Respect dependency boundaries:

- common must not import features or routes.
- features must not import routes.
- routes may import features and common.

Keep feature-specific business logic inside its feature.
Move code into common when it has an established shared purpose.
Avoid abstractions without current reuse or a clear architectural purpose.

A feature may use api.ts, types.ts, components/, and hooks/.
Larger hook collections may use hooks/queries.ts and hooks/mutations.ts.
Follow the surrounding feature structure; create only the files needed
for the requested behavior.

## Working on a task

- Read the closest relevant implementation before introducing a pattern.
- Keep changes scoped to the requested outcome.
- For a substantial or ambiguous task, outline a short plan first.
- Make routine implementation decisions using existing conventions.
- Ask for clarification when a missing decision materially changes
  product behavior or scope.
- Identify a bug's cause before fixing it.
- Follow existing architecture without reproducing an obvious bug.
- Do not refactor, rename, reformat, or upgrade unrelated code.

For substantial feature work, read
.agents/skills/add-react-feature/SKILL.md when it exists.
Apply it within the requested scope and these project conventions.
If it is missing, report the missing reference and use the existing
implementations; do not invent its contents.

## Feature UI patterns

Choose the pattern that fits the requested interaction.

### Dialog interaction

Use a dialog for an action performed within the current page.

There is currently no feature dialog or feature form implementation.
Inspect src/common/components/dialog.tsx for the existing dialog primitive
and its createDialogHandle API. When using a handle, the route creates it,
renders the trigger, and mounts the feature dialog once.

The feature dialog owns the interaction lifecycle:

- mutation and pending state;
- relevant query invalidation;
- success and error feedback;
- closing after success when appropriate;
- dialog translations and form defaults.

Keep this behavior in the dialog rather than duplicating it in the route.
Prevent duplicate submission while the mutation is pending.
Keep the dialog open and preserve input when submission fails.

### Dedicated page

Use a dedicated route for a standalone screen with its own URL.

Current route references are src/routes/index.tsx and
src/routes/__root.tsx. Registration routes and forms do not exist yet;
do not treat the empty auth files as completed implementations.

The route may own page layout, queries, mutation orchestration,
navigation, and page-specific state.

The feature form owns field rendering and validation. Prefer passing
default values, submission behavior, pending state, and a form ID
when needed by the existing UI pattern.

Keep reusable domain behavior inside the feature.
Routes may contain page composition and orchestration.

## Forms

Use React Hook Form and Zod with zodResolver.

- Reuse existing Input, Textarea, Select, Checkbox, Button, Field,
  and Fieldset components.
- Keep feature validation schemas and types inside the feature.
- Infer types from schemas where appropriate, accounting for schema
  transformations and the actual API contract.
- Handle values and callbacks explicitly for non-native controls.
- Set aria-invalid when a control is invalid.
- Provide accessible labels and associate errors with their fields.
- Show validation and API errors in the appropriate UI.
- Prevent duplicate submission and preserve input on failure.
- Keep navigation and mutation side effects in the route or dialog
  that owns the interaction.

## API and errors

Use the shared apiClient from @/common/api/api-client.

- Put feature requests in features/<feature>/api.ts.
- Keep HTTP calls out of React components.
- Follow existing naming conventions, such as getItemsAsync,
  createItemAsync, and registerUserAsync.
- Keep feature request and response types inside the feature.
- Use common/api for shared API infrastructure.
- Avoid feature-specific Axios instances without a concrete reason.

The shared response interceptor returns response.data.
Inspect the client implementation and keep function return types
consistent with its runtime behavior. Do not unwrap the data twice
or use casts merely to conceal a mismatch.

Reuse ProblemDetails from src/common/api/api-types.ts and the existing
Axios error normalization. Introduce a different error format only
when the backend contract requires it.

## TanStack Query

Use TanStack Query for server state.
Prefer derived values over copying server data into component state.
Form editing may use its own draft values.

For queries:

- Prefer queryOptions factories reusable by hooks and route loaders.
- Include all result-affecting parameters in query keys.
- Reuse QueryConfig from src/common/lib/react-query.ts where appropriate.

For mutations:

- Keep basic mutation hooks thin.
- Reuse MutationConfig where it matches the implementation.
- Place interaction-specific side effects at the orchestration boundary.
- Invalidate only affected queries.
- Obtain query keys from existing factories where available.
- Preserve existing success and error callbacks when composing behavior.

Read the existing query and mutation implementations before adding
new cache behavior.

## Routing and generated files

Use TanStack Router file-based routing under src/routes.

Routes may contain layout, page composition, feature queries,
mutation orchestration, navigation, and page-specific state.

Do not manually edit src/routeTree.gen.ts or other generated files.
Modify source routes or generator configuration and regenerate output
with the project's existing tooling.

After route changes, ensure generated route types are current before
TypeScript validation. Discover the actual generation workflow;
do not invent a command.

Preserve existing authentication and route-access rules.

## UI and React

Reuse the Base UI-based primitives in src/common/components.
Inspect a primitive's API before using it.

- Use Tailwind CSS and existing light/dark styling conventions.
- Use cn for conditional class composition.
- Use class-variance-authority for reusable component variants.
- Use functional components and hooks.
- Derive values during rendering when possible.
- Use effects for synchronization with external systems.
- Preserve keyboard interaction, focus management, and accessible names.
- Include appropriate loading, error, and empty states.

Avoid introducing another UI library or styling system without
a requirement that the existing stack cannot reasonably satisfy.

## TypeScript and imports

Keep new code strongly typed.

- Reuse existing domain types instead of duplicating shapes.
- Avoid any except where justified at an external boundary.
- Do not suppress type errors just to make checks pass.
- Respect the project's unused-variable and unused-parameter rules.
- Use @/ for imports across feature or top-level boundaries.
- Relative imports are acceptable for nearby files in the same feature.

The @/* alias maps to src/*.
Keep runtime and TypeScript alias resolution consistent.

## Dependencies

Before adding a dependency:

1. Inspect package.json.
2. Check existing libraries and project abstractions.
3. Add a dependency only when it provides a concrete benefit.

Keep the lockfile updated when dependencies change.
Do not upgrade unrelated dependencies as part of a feature task.
Use dependency versions compatible with the project's
Node, Vite, React, and TypeScript versions.

## Validation

Read package.json and run the checks actually configured.

The configured validation commands are:

- npm run lint
- npm run typecheck
- npm run build

The current build includes TypeScript checking through tsc -b.

The existing Vite router plugin generates route types when Vite initializes.
If routeTree.gen.ts is missing or stale, initialize Vite with npm run dev
before TypeScript validation.
Do not manually edit the generated tree or invent missing routes to fix links.

Run relevant checks during implementation and appropriate final
checks before finishing meaningful source changes.
Avoid rerunning unchanged checks without a reason.

Fix failures introduced by the change.
Distinguish pre-existing failures from new failures.
Do not suppress errors to make validation pass.

Do not claim a check passed unless it was executed successfully.

## Before finishing

Review the diff against the requested behavior.

Verify relevant architecture, API, cache, form, localization,
accessibility, and generated-file conventions.

Report:

- what changed and why;
- which checks ran and their results;
- what could not be verified;
- any assumptions or remaining limitations.

Explain significant decisions clearly so the project owner can learn
from the change. Keep the explanation focused on the requested task.
