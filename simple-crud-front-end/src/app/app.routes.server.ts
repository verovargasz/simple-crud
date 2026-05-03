import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes can be prerendered
  { path: '',              renderMode: RenderMode.Prerender },
  { path: 'items',         renderMode: RenderMode.Prerender },
  { path: 'items/new',     renderMode: RenderMode.Prerender },

  // Dynamic route — id is not known at build time, must be server-rendered
  { path: 'items/:id/edit', renderMode: RenderMode.Server },
];
