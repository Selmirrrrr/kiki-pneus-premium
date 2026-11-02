// Données centrales du site : modifier ici les coordonnées, horaires, liens de réservation, etc.

export const site = {
  name: 'Kiki Pneus SA',
  url: 'https://kiki-pneus.ch',
  founded: 1959,
  city: 'Yverdon-les-Bains',
  tagline: 'Votre spécialiste en pneus toutes marques à Yverdon-les-Bains depuis 1959.',
  social: {
    facebook: 'https://www.facebook.com/kikipneus1400',
    instagram: 'https://www.instagram.com/kiki_pneus_sa/',
  },
  /**
   * Bandeau d'annonce affiché en haut de toutes les pages (fermeture annuelle, etc.).
   * Mettre à `null` pour le masquer. Exemple :
   * { title: 'Fermeture annuelle', text: 'Nos locaux seront fermés du 23 décembre à 16h00 au 3 janvier à 8h00.' }
   */
  announcement: null as null | { title: string; text: string },
};

/** Horaires habituels (identiques pour les deux agences). Heures au format HH:MM, heure de Zurich. */
export const hours = {
  weekdays: [
    ['08:00', '12:00'],
    ['13:30', '18:00'],
  ],
  saturday: [['08:00', '11:30']],
  /** Mois (1-12) durant lesquels le garage est fermé le samedi. */
  saturdayClosedMonths: [1, 2, 3, 7, 8, 9],
  summary: [
    { days: 'Lundi – Vendredi', time: '8h00 – 12h00 · 13h30 – 18h00' },
    { days: 'Samedi', time: '8h00 – 11h30', note: 'Fermé le samedi de janvier à mars et de juillet à septembre' },
  ],
} as const;

export type Agency = {
  id: 'centre' | 'sud';
  name: string;
  short: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
  phoneHref: string;
  email: string;
  bookingUrl: string;
  mapsUrl: string;
  highlight: string;
  /** Coordonnées GPS exactes (optionnel, utilisé pour le référencement local). */
  geo?: { lat: number; lng: number };
};

export const agencies: Agency[] = [
  {
    id: 'centre',
    name: 'Kiki Pneus Yverdon-Centre',
    short: "Rue d'Orbe",
    street: "Rue d'Orbe 36",
    zip: '1400',
    city: 'Yverdon-les-Bains',
    phone: '024 426 49 47',
    phoneHref: 'tel:+41244264947',
    email: 'info@kiki-pneus.ch',
    bookingUrl: 'https://web.meetme.io/business/92d92510-7f7c-11ed-9b42-972e104e7dbe',
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kiki+Pneus+Rue+d'Orbe+36+1400+Yverdon-les-Bains",
    highlight: 'À 2 minutes à pied du centre-ville et des centres commerciaux Métropole et Bel-Air.',
  },
  {
    id: 'sud',
    name: 'Kiki Pneus Yverdon-Sud',
    short: 'Rte de Lausanne',
    street: 'Rte de Lausanne 31',
    zip: '1400',
    city: 'Yverdon-les-Bains',
    phone: '024 425 20 00',
    phoneHref: 'tel:+41244252000',
    email: 'contact@kiki-pneus.ch',
    bookingUrl: 'https://web.meetme.io/business/d766fc05dd74ee69f5b5ee7450565d32',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kiki+Pneus+Route+de+Lausanne+31+1400+Yverdon-les-Bains',
    highlight: "Ouverte en 2017, à quelques secondes de la sortie d'autoroute Yverdon-Sud.",
    geo: { lat: 46.7623092, lng: 6.6480649 },
  },
];

export const nav = [
  { href: '/pneus', label: 'Pneus' },
  { href: '/jantes', label: 'Jantes' },
  { href: '/geometrie', label: 'Géométrie' },
  { href: '/services', label: 'Services auto' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/contact', label: 'Contact' },
];

export const brands = [
  { name: 'Michelin', url: 'https://www.michelin.ch/fr/' },
  { name: 'Pirelli', url: 'https://www.pirelli.com' },
  { name: 'Bridgestone', url: 'https://www.bridgestone.ch/fr' },
  { name: 'Continental', url: 'https://www.continental-pneus.ch' },
  { name: 'Goodyear', url: 'https://www.goodyear.eu/' },
  { name: 'Yokohama', url: 'https://fr.yokohama.ch' },
  { name: 'Vredestein', url: 'https://www.vredestein.ch/fr' },
  { name: 'Nokian', url: 'https://www.nokiantyres.fr' },
  { name: 'Hankook', url: 'https://www.hankooktire.com/fr/' },
  { name: 'Cooper', url: 'https://www.coopertire.fr' },
  { name: 'Toyo', url: 'https://www.toyotires.fr' },
  { name: 'Falken', url: 'http://falkentyre.com' },
];

export const partners = [
  { name: 'Pneu Total', url: 'https://www.pneutotal.ch/', logo: 'pneu-total' },
  { name: 'Swiss Tyre Group', url: 'https://www.swisstyregroup.ch/fr/home.html', logo: 'swiss-tyre-group' },
] as const;

export const reviews = [
  { author: 'Philippe I.', text: 'Excellent service, merci :-)' },
  { author: 'Olivier F.', text: "Bon accueil, possibilité de patienter à l'intérieur. Équipe compétente et organisée." },
  { author: 'Renato F.', text: 'Changement de pneu professionnel et très soigneux de la part du technicien qui a fait la prestation. Merci beaucoup.' },
  { author: 'Aude S.', text: 'Service rapide et prix au top. Merci' },
  { author: 'Jean-Marie C.', text: 'Patron et personnel au top' },
  { author: 'Nicolas B.', text: "Au top comme d'habitude ! Rapide et conviable !" },
];

export const vehicleTypes = ['Voitures', 'Motos', 'Scooters', 'Camionnettes', 'Camions', 'Agricoles', 'Génie civil'];
