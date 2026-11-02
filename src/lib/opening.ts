import { hours } from '../data/site';

type State = 'open' | 'break' | 'closed';

const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const label = (hhmm: string) => {
  const [h, m] = hhmm.split(':');
  return `${Number(h)}h${m}`;
};

/** Heure locale de Zurich, quel que soit le fuseau du visiteur. */
function zurichNow(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zurich',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return {
    weekday,
    month: Number(get('month')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

function slotsFor(weekday: number, month: number): readonly (readonly [string, string])[] {
  if (weekday >= 1 && weekday <= 5) return hours.weekdays;
  if (weekday === 6 && !(hours.saturdayClosedMonths as readonly number[]).includes(month)) return hours.saturday;
  return [];
}

/** Statut d'ouverture selon les horaires habituels (hors jours fériés). */
export function openingStatus(date = new Date()): { state: State; text: string } {
  const now = zurichNow(date);
  const today = slotsFor(now.weekday, now.month);

  for (const [start, end] of today) {
    if (now.minutes >= toMinutes(start) && now.minutes < toMinutes(end)) {
      return { state: 'open', text: `Ouvert · ferme à ${label(end)}` };
    }
  }

  const laterToday = today.find(([start]) => now.minutes < toMinutes(start));
  if (laterToday) {
    const isBreak = today.some(([, end]) => now.minutes >= toMinutes(end));
    return {
      state: isBreak ? 'break' : 'closed',
      text: `${isBreak ? 'Pause de midi · rouvre' : 'Fermé · ouvre'} à ${label(laterToday[0])}`,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = zurichNow(new Date(date.getTime() + offset * 86_400_000));
    const next = slotsFor(day.weekday, day.month);
    if (next.length) {
      const dayLabel = offset === 1 ? 'demain' : DAY_NAMES[day.weekday];
      return { state: 'closed', text: `Fermé · ouvre ${dayLabel} à ${label(next[0][0])}` };
    }
  }
  return { state: 'closed', text: 'Fermé' };
}

/** Met à jour tous les éléments [data-opening-status] de la page. */
export function hydrateOpeningStatus() {
  const update = () => {
    const { state, text } = openingStatus();
    document.querySelectorAll<HTMLElement>('[data-opening-status]').forEach((el) => {
      el.dataset.state = state;
      el.textContent = text;
    });
  };
  update();
  setInterval(update, 60_000);
}
