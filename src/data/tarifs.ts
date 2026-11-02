// Tarifs des prestations — en CHF, TVA incluse. Mettre à jour ici : la page /tarifs et son estimateur se régénèrent.

export const tarifsMeta = {
  validFrom: 'mars 2026',
  vat: '8,1 %',
};

export type VehicleId = 'tourisme' | 'suv' | 'camionnettes';

type Rim = { id: string; label: string; detail: string };

export const vehicles: { id: VehicleId; label: string; rims: Rim[] }[] = [
  {
    id: 'tourisme',
    label: 'Tourisme',
    rims: [
      { id: '16', label: 'Jusqu’à 16″', detail: 'alu jusqu’à 16″' },
      { id: '17-18', label: '17″ – 18″', detail: 'alu 17″ & 18″' },
      { id: '19-20', label: '19″ – 20″', detail: 'alu 19″ & 20″' },
      { id: '21', label: '21″ et +', detail: 'alu 21″ & plus' },
    ],
  },
  {
    id: 'suv',
    label: '4×4 – SUV',
    rims: [
      { id: '18', label: 'Jusqu’à 18″', detail: 'alu jusqu’à 18″' },
      { id: '19-20', label: '19″ – 20″', detail: 'alu 19″ & 20″' },
      { id: '21', label: '21″ et +', detail: 'alu 21″ & plus' },
    ],
  },
  {
    id: 'camionnettes',
    label: 'Camionnette',
    rims: [
      { id: 'acier', label: 'Acier', detail: 'acier' },
      { id: 'alu', label: 'Alu', detail: 'alu' },
    ],
  },
];

/** Prestations de montage, prix par type de véhicule puis par jante (id de `vehicles[].rims`). */
export const services: { id: string; label: string; prices: Record<VehicleId, Record<string, number>> }[] = [
  {
    id: 'montage-roues',
    label: '4 montages + équilibrages',
    prices: {
      tourisme: { '16': 66, '17-18': 76, '19-20': 84, '21': 88 },
      suv: { '18': 76, '19-20': 84, '21': 94 },
      camionnettes: { acier: 82, alu: 90 },
    },
  },
  {
    id: 'montage-pneus',
    label: '4 montages, équilibrages & valves',
    prices: {
      tourisme: { '16': 108, '17-18': 116, '19-20': 124, '21': 142 },
      suv: { '18': 124, '19-20': 132, '21': 146 },
      camionnettes: { acier: 132, alu: 142 },
    },
  },
];

/** Gardiennage, prix par saison. */
export const storage = [
  { id: '16', label: 'Pneus jusqu’à 16″', price: 48 },
  { id: '17', label: 'Pneus 17″ et +', price: 60 },
  { id: 'roues', label: 'Roues avec jantes', price: 68 },
];

export const geometrie = { label: 'Géométrie', price: 160, from: true };

export const extras = [
  { label: 'Capteurs de pression TPMS', price: 32 },
  { label: 'Élimination de carcasse', price: 6 },
];

export const chf = (n: number) => `CHF ${n.toFixed(2)}`;

export type Selection = { vehicle: string; rim: string; service: string; storage: string };

/** Calcul de l'estimation, partagé entre le rendu statique et le script de la page. */
export function estimate(sel: Selection) {
  const vehicle = vehicles.find((v) => v.id === sel.vehicle) ?? vehicles[0];
  const rim = vehicle.rims.find((r) => r.id === sel.rim) ?? vehicle.rims[0];
  const service = services.find((s) => s.id === sel.service) ?? services[0];
  const stored = storage.find((s) => s.id === sel.storage);
  const lines = [{ label: `${service.label} · ${vehicle.label}, ${rim.detail}`, price: service.prices[vehicle.id][rim.id] }];
  if (stored) lines.push({ label: `Gardiennage une saison · ${stored.label}`, price: stored.price });
  return { vehicle: vehicle.id, rim: rim.id, lines, total: lines.reduce((sum, l) => sum + l.price, 0) };
}
