/**
 * Préfixe un chemin interne avec le `base` du site, pour qu'il fonctionne aussi
 * lorsqu'il est servi dans un sous-dossier (ex. prévisualisation GitHub Pages).
 */
export const link = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
