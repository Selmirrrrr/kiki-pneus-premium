// Catalogue de pneus : chargement et normalisation des données de l'API publique.

export const TIRES_API = 'https://segle.alwaysdata.net/api/tirestorage/tire/allPublic';

type RawTire = {
  Ean: string;
  Marque: string;
  Dimensions: string;
  Season: string;
  Charge: string;
  Vitesse: string;
  Segment: string;
  Profil: string;
};

export type Season = 'ete' | 'hiver' | '4saisons';

export type Tire = {
  ean: string;
  brand: string;
  profile: string;
  size: string;
  width: string;
  ratio: string;
  rim: string;
  season: Season | '';
  load: string;
  speed: string;
  /** texte en minuscules pour la recherche libre */
  haystack: string;
};

export const seasonLabels: Record<Season, string> = {
  ete: 'Été',
  hiver: 'Hiver',
  '4saisons': '4 saisons',
};

const SEASONS: Record<string, Season> = { summer: 'ete', winter: 'hiver', 'all season': '4saisons' };
const SIZE = /(\d{3})\s*\/\s*(\d{2}|100)(?!\d)\s*Z?R?F?\s*(\d{2}(?:[.,]5)?)/i;
const missing = (v: string) => (/^n\/?a$/i.test(v) ? '' : v);

export function normalize(raw: RawTire): Tire {
  const dims = (raw.Dimensions ?? '').trim();
  const m = dims.match(SIZE);
  const [width, ratio, rim] = m ? [m[1], m[2], m[3].replace(',', '.')] : ['', '', ''];
  const brand = (raw.Marque ?? '').trim();
  const profile = (raw.Profil ?? '').trim();
  const ean = (raw.Ean ?? '').trim();
  const size = m ? `${width}/${ratio} R${rim}` : dims;
  return {
    ean,
    brand,
    profile,
    size,
    width,
    ratio,
    rim,
    season: SEASONS[(raw.Season ?? '').trim().toLowerCase()] ?? '',
    // certaines entrées contiennent aussi la lettre de vitesse (« 91T ») : on ne garde que l'indice
    load: missing((raw.Charge ?? '').trim()).replace(/^(\d{2,3}(?:\/\d{2,3})?)\s*[A-Z]{1,2}$/i, '$1'),
    speed: missing((raw.Vitesse ?? '').trim().replace(/[()]/g, '').toUpperCase()),
    haystack: `${brand} ${profile} ${ean} ${dims} ${width}/${ratio}r${rim} ${width}${ratio}${rim}`.toLowerCase(),
  };
}

export async function loadTires(signal?: AbortSignal): Promise<Tire[]> {
  const res = await fetch(TIRES_API, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: RawTire[] = await res.json();
  return data.map(normalize);
}

export type Filters = {
  q: string;
  season: Season | '';
  width: string;
  ratio: string;
  rim: string;
  brand: string;
  speed: string;
};

export const facetKeys = ['width', 'ratio', 'rim', 'brand', 'speed'] as const;
export type FacetKey = (typeof facetKeys)[number];

export function matches(t: Tire, f: Filters, ignore?: keyof Filters): boolean {
  if (ignore !== 'season' && f.season && t.season !== f.season) return false;
  for (const key of facetKeys) {
    if (key !== ignore && f[key] && t[key] !== f[key]) return false;
  }
  if (ignore !== 'q' && f.q) {
    const terms = f.q.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');
    if (!terms.every((term) => t.haystack.includes(term))) return false;
  }
  return true;
}

/** Valeurs disponibles pour un filtre, compte tenu de tous les autres filtres actifs. */
export function facetOptions(tires: Tire[], f: Filters, key: FacetKey) {
  const counts = new Map<string, number>();
  for (const t of tires) {
    const value = t[key];
    if (value && matches(t, f, key)) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  const numeric = key !== 'brand' && key !== 'speed';
  return [...counts.entries()].sort(([a], [b]) => (numeric ? Number(a) - Number(b) : a.localeCompare(b, 'fr')));
}
