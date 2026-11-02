# Kiki Pneus SA — site web (Astro), variante premium « Atelier noir »

Variante haut de gamme de la refonte de [kiki-pneus.ch](https://kiki-pneus.ch) : même contenu et mêmes fonctionnalités que le projet `kiki-pneus`, direction visuelle différente (noir profond, titres serif Instrument Serif, texte Hanken Grotesk, filets fins, grain, accents cuivrés).

Spécifique à cette variante :

- `src/assets/logo-light.png` : logo recoloré en ivoire pour les fonds sombres (gris → ivoire, orange conservé).
- Visuels produits sur fond blanc (`azote`, `chaines`, `jante-acier`, `jante-alu`, `tpms`) détourés pour s'afficher sur fond noir.
- Les données (`src/data/`) et la logique (`src/lib/`) sont identiques à `kiki-pneus` : une modification de contenu est à reporter dans les deux projets.

## Démarrer

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # génère le site statique dans dist/
npm run preview    # prévisualise le build
npx astro check    # vérification TypeScript
```

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| Adresses, téléphones, e-mails, liens de réservation, horaires, avis, marques | `src/data/site.ts` |
| Bandeau d'annonce (fermeture annuelle…) | `site.announcement` dans `src/data/site.ts` |
| Tarifs | `src/data/tarifs.ts` |
| Textes des pages | `src/pages/*.astro` |
| Photos et visuels | `src/assets/` (optimisés automatiquement en WebP au build) |

Les horaires de `src/data/site.ts` pilotent aussi l'indicateur « Ouvert / Fermé » (heure de Zurich, samedis fermés de janvier à mars et de juillet à septembre, hors jours fériés).

## Pages

`/` accueil · `/pneus` · `/jantes` · `/geometrie` · `/services` · `/tarifs` · `/catalogue` · `/contact`

Les anciennes adresses `/geometry`, `/tarif` et `/tiers` redirigent vers les nouvelles (`astro.config.mjs`).

## Catalogue de pneus

`/catalogue` interroge côté navigateur la même API publique que l'ancien site (`src/lib/tires.ts`) : recherche libre, filtres par saison, largeur, hauteur, diamètre, vitesse et marque (avec compteurs), filtres partageables dans l'URL. Le bouton « Demander une offre » pré-remplit le formulaire de contact.

## Formulaire de contact

Le site étant statique, il n'y a pas de serveur pour envoyer les e-mails. Deux modes :

- **Sans configuration** : le formulaire ouvre la messagerie du visiteur avec le message pré-rempli, adressé à l'agence choisie.
- **Avec un service de formulaire** (Formspree, Web3Forms, endpoint maison…) : copier `.env.example` en `.env` et renseigner `PUBLIC_FORM_ENDPOINT`. Les champs sont envoyés en `POST` (FormData), avec un champ `destinataire` contenant l'e-mail de l'agence.

## Déploiement

Le dossier `dist/` peut être servi par n'importe quel hébergement statique (Infomaniak, Netlify, Cloudflare Pages, Vercel…).

### Prévisualisation GitHub Pages

Chaque push sur `main` déploie le site via `.github/workflows/deploy.yml`. La CI transmet `SITE_URL` et `BASE_PATH` à Astro, car le site y est servi dans un sous-dossier (`/kiki-pneus/`). Pour cette raison, les liens internes passent par `link()` (`src/lib/url.ts`).

La prévisualisation porte une balise `noindex` pour ne pas concurrencer kiki-pneus.ch dans les moteurs de recherche. Le build de production (`npm run build`, sans variables) génère des liens à la racine et sans `noindex`.
