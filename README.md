# Testing & verifying

- Start dev server `npm run dev` and open `http://localhost:3000`.
- After login — verify redirect to `/dashboard`, then navigate to `/users` and `/products`.
---

---
 **Why Zustand**

 We chose Zustand because it is lightweight, minimal boilerplate, supports async actions inside stores, and is easier to reason about for small-to-medium apps compared to Redux. Zustand uses a hooks-based API that's simple to adopt and keeps components clean.

---

# code functionality
- Keep code modular: small components (SearchBar, Pagination, ProductCard) make reuse simple.  
- Document functions with short comments (especially async actions in Zustand).  
- Used a consistent CSS reset (MUI’s CssBaseline helps) and spacing scale.  
