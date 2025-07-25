# Ecomm-Easy Frontend

This project is a modern, best-practice starter for e-commerce or SaaS frontends, built with:

- **Next.js 15+** (App Router, `/src/app` directory)
- **React 18+**
- **TypeScript**
- **Material UI (MUI)** for UI components
- **Zustand** for state management
- **Apollo Client** for GraphQL APIs

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Features
- **App Directory**: Uses Next.js `/src/app` for routing and layouts.
- **Material UI**: Theming and components out of the box.
- **Zustand**: Simple, scalable state management (see `src/store/counter.ts`).
- **Apollo Client**: Ready for GraphQL APIs (see usage in `src/app/page.tsx`).
- **TypeScript**: Type safety everywhere.

## Example Usage
- The home page demonstrates:
  - A MUI Button and Typography
  - Zustand-powered counter
  - Apollo GraphQL query (update `/api/graphql` endpoint as needed)

## Best Practices
- Use the `/src/app/layout.tsx` to wrap providers (MUI, Apollo, etc).
- Organize state stores in `/src/store/`.
- Use functional components and hooks.
- Keep UI logic in components, business logic in stores/services.

## Customization
- Update the GraphQL endpoint in `src/app/layout.tsx`.
- Add more Zustand stores in `/src/store/` as needed.
- Extend the MUI theme in `layout.tsx`.

---

Generated by [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app) and enhanced for modern best practices.
