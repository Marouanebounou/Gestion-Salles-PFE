// Local mock used while Adil's reservation API is not yet deployed.
// Replace all usages with real reservationApi.js calls once /api/reservations is live.

const STORAGE_KEY = 'mock_reservations';

let nextId = 100;

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultReservations();
  } catch {
    return defaultReservations();
  }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function defaultReservations() {
  const base = [
    {
      id: 1,
      salleId: 1,
      salleNom: 'Salle A101',
      motif: 'Cours de Mathématiques',
      dateDebut: today('09:00'),
      dateFin: today('11:00'),
      statut: 'CONFIRMEE',
    },
    {
      id: 2,
      salleId: 2,
      salleNom: 'Amphi B',
      motif: 'Conférence IA',
      dateDebut: today('14:00'),
      dateFin: today('16:00'),
      statut: 'EN_ATTENTE',
    },
    {
      id: 3,
      salleId: 3,
      salleNom: 'Labo Informatique',
      motif: 'TP Réseaux',
      dateDebut: tomorrow('10:00'),
      dateFin: tomorrow('12:00'),
      statut: 'CONFIRMEE',
    },
  ];
  save(base);
  return base;
}

function today(time) {
  const d = new Date();
  const [h, m] = time.split(':');
  d.setHours(Number(h), Number(m), 0, 0);
  return d.toISOString();
}

function tomorrow(time) {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const [h, m] = time.split(':');
  d.setHours(Number(h), Number(m), 0, 0);
  return d.toISOString();
}

export const mockGetAll = () => Promise.resolve({ data: load() });

export const mockCreate = (data) => {
  const list = load();
  const item = { ...data, id: nextId++, statut: 'EN_ATTENTE' };
  list.push(item);
  save(list);
  return Promise.resolve({ data: item });
};

export const mockUpdate = (id, data) => {
  const list = load();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return Promise.reject(new Error('Not found'));
  list[idx] = { ...list[idx], ...data };
  save(list);
  return Promise.resolve({ data: list[idx] });
};

export const mockDelete = (id) => {
  const list = load().filter((r) => r.id !== id);
  save(list);
  return Promise.resolve({ data: {} });
};
