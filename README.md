# Suru

## A Todo App

> Suru (する): Japanese for "to do"

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Preliminary requirement: [install](https://bun.sh/docs/installation#installing) `bun`

```bash
npm i -g bun
```

Install packages and run the dev server:

```bash
bun i
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Info

### Tools/packages implemented

- [`bun`](https://bun.sh/)
  - Blazingly fast Javascript runtime
- [`next`](https://nextjs.org/)
  - Next.js with the app router
  - RSC (React Server Components)
  - Server actions
  - Typescript
- [`zod`](https://zod.dev/)
  - Type-safe validation library
- [`tailwindcss`](https://tailwindcss.com/)
  - Atomic CSS framework
- [`clsx`](https://github.com/lukeed/clsx) and [`tailwind-merge`](https://github.com/dcastil/tailwind-merge)
  - Dynamic class list helpers
- [`react-icons`](https://react-icons.github.io/react-icons/)
  - React Icon components for all major open source icon sets
- `eslint` and `prettier`
  - Industry standard code linting and formatting

### Notes

Nearly all of the components used are RSC (React Server Components) with the exception of the two button components. These button components are only using the `useFormStatus` hook from `react-dom` to add a loading spinner for when the forms they are in are submitting.

Because the mock API does not persist the complete status for todos, I've added a simple server-side in-memory state of the completed todos, simulating a remote database. This server-side in-memory state can be reset with the "Reset" button on the home page.

Because all of the todos from the mock API have due dates in the past, I've added a static todo in to the list that's due in the future to display the difference between past due and regular todos. This static todo can also be completed because of the in-memory completed state.
