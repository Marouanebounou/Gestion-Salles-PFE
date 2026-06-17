import { useState, useEffect, useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import dayjs from 'dayjs';
import ReservationModal from '../components/ReservationModal';
import { useAuth } from '../context/AuthContext';
import { mockGetAll, mockCreate, mockUpdate, mockDelete } from '../api/mockReservations';
import './CalendarPage.css';

const STATUT_COLORS = {
  CONFIRMEE: '#16a34a',
  EN_ATTENTE: '#d97706',
  ANNULEE: '#dc2626',
};

function toFCEvent(r) {
  return {
    id: String(r.id),
    title: `${r.salleNom} — ${r.motif}`,
    start: r.dateDebut,
    end: r.dateFin,
    backgroundColor: STATUT_COLORS[r.statut] ?? '#2563eb',
    borderColor: STATUT_COLORS[r.statut] ?? '#2563eb',
    extendedProps: r,
  };
}

export default function CalendarPage() {
  const { logout, role } = useAuth();
  const calendarRef = useRef(null);
  const [reservations, setReservations] = useState([]);
  const [modal, setModal] = useState(null); // null | { reservation?, defaultStart?, defaultEnd? }
  const [view, setView] = useState('timeGridWeek');

  const fetchAll = useCallback(async () => {
    try {
      const { data } = await mockGetAll();
      setReservations(data);
    } catch (err) {
      console.error('Erreur chargement réservations', err);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleDateSelect = (info) => {
    setModal({ defaultStart: info.start, defaultEnd: info.end });
  };

  const handleEventClick = ({ event }) => {
    setModal({ reservation: event.extendedProps });
  };

  const handleEventDrop = async ({ event, revert }) => {
    try {
      const updated = {
        ...event.extendedProps,
        dateDebut: event.start.toISOString(),
        dateFin: event.end ? event.end.toISOString() : dayjs(event.start).add(1, 'hour').toISOString(),
      };
      await mockUpdate(updated.id, updated);
      setReservations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch {
      revert();
    }
  };

  const handleEventResize = async ({ event, revert }) => {
    try {
      const updated = {
        ...event.extendedProps,
        dateDebut: event.start.toISOString(),
        dateFin: event.end.toISOString(),
      };
      await mockUpdate(updated.id, updated);
      setReservations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch {
      revert();
    }
  };

  const handleSave = async (data) => {
    if (data.id) {
      await mockUpdate(data.id, data);
      setReservations((prev) => prev.map((r) => (r.id === data.id ? { ...r, ...data } : r)));
    } else {
      const { data: created } = await mockCreate(data);
      setReservations((prev) => [...prev, created]);
    }
  };

  const handleDelete = async (id) => {
    await mockDelete(id);
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const events = reservations.map(toFCEvent);

  return (
    <div className="calendar-page">
      <header className="cal-header">
        <div className="cal-header-left">
          <span className="cal-logo">🏫</span>
          <h1>Réservations des Salles</h1>
        </div>
        <div className="cal-header-right">
          <button className="btn-new" onClick={() => setModal({})}>+ Nouvelle réservation</button>
          <button className="btn-logout" onClick={logout}>Déconnexion</button>
        </div>
      </header>

      <div className="cal-legend">
        <span className="legend-item" style={{ '--c': STATUT_COLORS.CONFIRMEE }}>Confirmée</span>
        <span className="legend-item" style={{ '--c': STATUT_COLORS.EN_ATTENTE }}>En attente</span>
        <span className="legend-item" style={{ '--c': STATUT_COLORS.ANNULEE }}>Annulée</span>
        <span className="legend-hint">Glisser-déposer pour déplacer · Redimensionner pour ajuster la durée</span>
      </div>

      <div className="cal-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView={view}
          locale={frLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          slotMinTime="07:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          height="auto"
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventContent={renderEvent}
          viewDidMount={(info) => setView(info.view.type)}
        />
      </div>

      {modal !== null && (
        <ReservationModal
          reservation={modal.reservation}
          defaultStart={modal.defaultStart}
          defaultEnd={modal.defaultEnd}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

function renderEvent({ event }) {
  const r = event.extendedProps;
  return (
    <div className="fc-event-inner">
      <strong>{r.salleNom}</strong>
      <span>{r.motif}</span>
      <span className="fc-event-time">
        {dayjs(r.dateDebut).format('HH:mm')} – {dayjs(r.dateFin).format('HH:mm')}
      </span>
    </div>
  );
}
