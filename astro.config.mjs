// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production : https://kiki-pneus.ch. La CI GitHub Pages fournit SITE_URL et BASE_PATH
// pour la prévisualisation servie dans un sous-dossier (https://<compte>.github.io/kiki-pneus/).
const base = process.env.BASE_PATH || '/';
// Astro n'applique pas `base` aux cibles des redirections : on le préfixe nous-mêmes
const to = (/** @type {string} */ path) => `${base.replace(/\/$/, '')}${path}`;

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://kiki-pneus.ch',
  base,
  integrations: [sitemap()],
  // Anciennes adresses du site, conservées pour le référencement et les favoris
  redirects: {
    '/geometry': to('/geometrie'),
    '/tarif': to('/tarifs'),
    '/tiers': to('/catalogue'),
  },
});
