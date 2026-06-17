import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getSalles } from '../api/salleApi';
import './ReservationModal.css';

const STATUT_LABELS = {
  CONFIRMEE: { label: 'Confirmée', color: '#16a34a' },
  EN_ATTENTE: { label: 'En attente', color: '#d97706' },
  ANNULEE: { label: 'Annulée', color: '#dc2626' },
};

export default function ReservationModal({ reservation, defaultStart, defaultEnd, onSave, onDelete, onClose }) {
  const isEdit = !!reservation;
  const [salles, setSalles] = useState([]);
  const [form, setForm] = useState({
    salleId: reservation?.salleId ?? '',
    salleNom: reservation?.salleNom ?? '',
    motif: reservation?.motif ?? '',
    dateDebut: reservation?.dateDebut ? dayjs(reservation.dateDebut).format('YYYY-MM-DDTHH:mm') : (defaultStart ? dayjs(defaultStart).format('YYYY-MM-DDTHH:mm') : ''),
    dateFin: reservation?.dateFin ? dayjs(reservation.dateFin).format('YYYY-MM-DDTHH:mm') : (defaultEnd ? dayjs(defaultEnd).format('YYYY-MM-DDTHH:mm') : ''),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSalles()
      .then(({ data }) => setSalles(data))
      .catch(() => {
        // Backend may not be running — use empty list
        setSalles([
          { id: 1, nom: 'Salle A101', type: 'CLASSE' },
          { id: 2, nom: 'Amphi B', type: 'AMPHITHEATRE' },
          { id: 3, nom: 'Labo Informatique', type: 'LABO' },
          { id: 4, nom: 'Salle de Réunion', type: 'REUNION' },
        ]);
      });
  }, []);

  const handle = (e) => {
    const { name, value } = e.target;
    if (name === 'salleId') {
      const salle = salles.find((s) => String(s.id) === value);
      setForm((f) => ({ ...f, salleId: Number(value), salleNom: salle?.nom ?? '' }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.salleId) return 'Veuillez choisir une salle.';
    if (!form.motif.trim()) return 'Le motif est obligatoire.';
    if (!form.dateDebut || !form.dateFin) return 'Les dates sont obligatoires.';
    if (dayjs(form.dateFin).isBefore(dayjs(form.dateDebut))) return 'La fin doit être après le début.';
    if (dayjs(form.dateFin).diff(dayjs(form.dateDebut), 'minute') < 15)
      return 'La réservation doit durer au moins 15 minutes.';
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await onSave({
        ...form,
        dateDebut: new Date(form.dateDebut).toISOString(),
        dateFin: new Date(form.dateFin).toISOString(),
      });
      onClose();
    } catch (ex) {
      setError(ex.response?.data?.message || 'Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Supprimer cette réservation ?')) return;
    setLoading(true);
    try {
      await onDelete(reservation.id);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const statut = reservation?.statut;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{isEdit ? 'Modifier la réservation' : 'Nouvelle réservation'}</h2>
          {statut && (
            <span className="statut-badge" style={{ background: STATUT_LABELS[statut]?.color }}>
              {STATUT_LABELS[statut]?.label}
            </span>
          )}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={submit} className="modal-form">
          <div className="field">
            <label>Salle</label>
            <select name="salleId" value={form.salleId} onChange={handle} required>
              <option value="">-- Choisir une salle --</option>
              {salles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nom} ({s.type})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Motif</label>
            <input name="motif" value={form.motif} onChange={handle} required placeholder="Ex: Cours de mathématiques" />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Début</label>
              <input name="dateDebut" type="datetime-local" value={form.dateDebut} onChange={handle} required />
            </div>
            <div className="field">
              <label>Fin</label>
              <input name="dateFin" type="datetime-local" value={form.dateFin} onChange={handle} required />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            {isEdit && (
              <button type="button" className="btn-danger" onClick={handleDelete} disabled={loading}>
                Supprimer
              </button>
            )}
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Annuler
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sauvegarde…' : isEdit ? 'Mettre à jour' : 'Réserver'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
