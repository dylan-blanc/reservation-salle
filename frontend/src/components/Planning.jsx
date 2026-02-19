import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalReservation from "./ModalReservation";
import { planningService } from "../services/api";
import ModalReadReservation from "./ModalReadReservation";

const HOUR_START = 8;
const HOUR_COUNT = 11;
const HOUR_HEIGHT = 40;

const normalizeDayIndex = (dayIndex) => (dayIndex === 0 ? 7 : dayIndex);

const getStartOfWeek = (date) => {
  const start = new Date(date);
  const todayIndex = normalizeDayIndex(start.getDay());
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (todayIndex - 1));
  return start;
};

const getEventLayout = (start, end) => {
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const dayStartMinutes = HOUR_START * 60;
  const dayEndMinutes = (HOUR_START + HOUR_COUNT) * 60;
  const clampedStart = Math.max(startMinutes, dayStartMinutes);
  const clampedEnd = Math.min(endMinutes, dayEndMinutes);

  if (clampedEnd <= clampedStart) {
    return null;
  }

  const top = ((clampedStart - dayStartMinutes) / 60) * HOUR_HEIGHT;
  const height = ((clampedEnd - clampedStart) / 60) * HOUR_HEIGHT;

  return { top, height };
};

const DAYS = [
  { id: 1, nom: "Lundi" },
  { id: 2, nom: "Mardi" },
  { id: 3, nom: "Mercredi" },
  { id: 4, nom: "Jeudi" },
  { id: 5, nom: "Vendredi" },
];

const formatHourLabel = (dateValue) =>
  dateValue
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", "h");

function Planning() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [editingReservation, setEditingReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // On utilise des objets pour lier l'ID (getDay) et le Nom
  const jours = DAYS;
  const heures = Array.from({ length: HOUR_COUNT }, (_, i) => i + HOUR_START);
  const now = new Date();
  const todayIndex = normalizeDayIndex(now.getDay());
  const startOfWeek = getStartOfWeek(now);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4);
  endOfWeek.setHours(23, 59, 59, 999);

  const loadPlanning = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await planningService.getAll();
      setReservations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlanning();
  }, [loadPlanning, isModalOpen]);

  const isPastDay = (dayId) => dayId < todayIndex;

  const isPastHourSlot = (jour, heure) => {
    if (jour.id !== todayIndex) {
      return false;
    }

    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + (jour.id - 1));
    const slotEnd = new Date(dayDate);
    slotEnd.setHours(heure + 0, 0, 0, 0);

    return slotEnd <= now;
  };

  const isReservedSlot = (jour, heure, dayReservations) => {
    if (!dayReservations.length) {
      return false;
    }

    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + (jour.id - 1));

    const slotStart = new Date(dayDate);
    slotStart.setHours(heure, 0, 0, 0);

    const slotEnd = new Date(dayDate);
    slotEnd.setHours(heure + 1, 0, 0, 0);

    return dayReservations.some(
      (reservation) =>
        slotStart < reservation.end && slotEnd > reservation.start,
    );
  };

  const handleSlotClick = (jour, heure) => {
    if (isPastDay(jour.id) || isPastHourSlot(jour, heure)) {
      return;
    }

    setIsReadModalOpen(false);
    setSelectedReservation(null);
    setEditingReservation(null);
    setSelectedSlot({ jour, heure });
    setIsModalOpen(true);
  };

  const handleReservationClick = (reservation, jour) => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    setEditingReservation(null);
    setSelectedReservation({
      ...reservation,
      title: reservation.reunion_title,
      start_date: reservation.start_date,
      end_date: reservation.end_date,
      jour,
    });
    setIsReadModalOpen(true);
  };

  const handleEditReservation = (reservation) => {
    setIsReadModalOpen(false);
    setEditingReservation(reservation);
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleDeleteReservation = async (reservation) => {
    if (!reservation?.id) {
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette reservation ?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await planningService.delete(reservation.id);
      setIsReadModalOpen(false);
      setSelectedReservation(null);
      await loadPlanning();
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression");
    }
  };

  const reservationsByDay = useMemo(() => {
    const grouped = jours.reduce((acc, jour) => {
      acc[jour.id] = [];
      return acc;
    }, {});

    reservations.forEach((reservation) => {
      const start = new Date(reservation.start_date);
      const end = new Date(reservation.end_date);

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return;
      }

      if (start < startOfWeek || start > endOfWeek) {
        return;
      }

      const dayIndex = normalizeDayIndex(start.getDay());

      if (!grouped[dayIndex]) {
        return;
      }

      grouped[dayIndex].push({ ...reservation, start, end, dayIndex });
    });

    Object.values(grouped).forEach((dayReservations) =>
      dayReservations.sort((a, b) => a.start - b.start),
    );

    return grouped;
  }, [reservations, startOfWeek, endOfWeek, jours]);

  return (
    <div className="w-full max-w-[80vw] mx-auto rounded-xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-slate-300 font-semibold">
          Planning semaine en cours
          <div className="text-xs text-slate-500">
            Du {startOfWeek.toLocaleDateString("fr-FR")} au{" "}
            {endOfWeek.toLocaleDateString("fr-FR")}
          </div>
        </div>
        <div>
          {startOfWeek.toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {error && <div className="mb-4 text-sm text-red-300">{error}</div>}

      {loading && !error && (
        <div className="mb-4 text-sm text-slate-400">Chargement...</div>
      )}

      <div
        className="w-full grid border border-white/10 bg-slate-900/80 backdrop-blur-sm rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: "60px repeat(5, minmax(0, 1fr))",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div className="border-b border-white/10 p-2 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
          Heures
        </div>
        {jours.map((jour) => {
          const isToday = jour.id === todayIndex;

          return (
            <div
              key={jour.id}
              className={`border-b border-white/10 p-1 sm:p-2 text-[11px] sm:text-sm leading-tight text-center font-semibold break-words ${
                isToday ? "text-accent bg-accent/10" : "text-slate-200"
              }`}
            >
              {jour.nom}
              {isToday && (
                <span className="block text-[8px] sm:text-[9px] uppercase font-bold text-accent leading-tight">
                  Aujourd'hui
                </span>
              )}
            </div>
          );
        })}

        <div className="border-r border-white/10 bg-slate-900/80">
          {heures.map((heure) => (
            <div
              key={heure}
              className="border-b border-white/10 flex items-center justify-center text-slate-400 font-mono text-xs"
              style={{ height: HOUR_HEIGHT }}
            >
              {heure.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {jours.map((jour) => {
          const dayReservations = reservationsByDay[jour.id] || [];
          const disabledDay = isPastDay(jour.id);
          const isToday = jour.id === todayIndex;

          return (
            <div
              key={jour.id}
              className={`relative border-l border-white/10 ${
                isToday ? "bg-accent/5" : ""
              } ${disabledDay ? "bg-slate-800/60" : ""}`}
            >
              <div
                className="relative"
                style={{ height: HOUR_HEIGHT * HOUR_COUNT }}
              >
                <div
                  className="absolute inset-0 grid"
                  style={{
                    gridTemplateRows: `repeat(${HOUR_COUNT}, ${HOUR_HEIGHT}px)`,
                  }}
                >
                  {heures.map((heure) => {
                    const disabledSlot =
                      disabledDay ||
                      isPastHourSlot(jour, heure) ||
                      isReservedSlot(jour, heure, dayReservations);

                    return (
                      <button
                        key={`${jour.id}-${heure}`}
                        type="button"
                        onClick={() => handleSlotClick(jour, heure)}
                        disabled={disabledSlot}
                        className={`border-b border-white/10 transition-colors ${
                          disabledSlot
                            ? "cursor-not-allowed bg-slate-800/70"
                            : "bg-slate-900/70 hover:bg-slate-800"
                        } enabled:cursor-pointer disabled:cursor-not-allowed`}
                        aria-label={`Reserver ${jour.nom} ${heure
                          .toString()
                          .padStart(2, "0")}:00`}
                      />
                    );
                  })}
                </div>

                {dayReservations.map((reservation) => {
                  const layout = getEventLayout(
                    reservation.start,
                    reservation.end,
                  );
                  const isShortReservation =
                    (reservation.end - reservation.start) / (1000 * 60 * 60) <
                    3;

                  if (!layout) {
                    return null;
                  }

                  return (
                    <button
                      key={reservation.id}
                      type="button"
                      onClick={() => handleReservationClick(reservation, jour)}
                      className="absolute left-2 right-2 rounded-lg bg-emerald-300 text-slate-900 shadow-md shadow-emerald-500/20 px-2 py-2 text-xs sm:text-sm font-semibold leading-none text-center cursor-pointer hover:brightness-95 overflow-hidden min-w-0 flex flex-col justify-center"
                      style={{ top: layout.top, height: layout.height }}
                    >
                      {!isShortReservation && (
                        <div className="text-[12px] uppercase tracking-wide text-emerald-900/70 hidden sm:block">
                          {formatHourLabel(reservation.start)} -{" "}
                          {formatHourLabel(reservation.end)}
                        </div>
                      )}
                      {/* Affiche le bloc seulement à partir de sm (>=640px) */}
                      <div className="hidden sm:block wrap-break-word text-center px-1 leading-none">
                        {!isShortReservation && (
                          <span className="text-xs font-bold text-emerald-900/90 leading-none">
                            {reservation.organizer}
                          </span>
                        )}{" "}
                        <span className="text-xs leading-none">
                          {reservation.reunion_title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <ModalReservation
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingReservation(null);
          }}
          slotData={selectedSlot}
          reservation={editingReservation}
          onSaved={loadPlanning}
        />
      )}

      {isReadModalOpen && selectedReservation && (
        <ModalReadReservation
          reservation={selectedReservation}
          onClose={() => {
            setIsReadModalOpen(false);
            setSelectedReservation(null);
          }}
          onEdit={handleEditReservation}
          onDelete={handleDeleteReservation}
        />
      )}
    </div>
  );
}

export default Planning;
