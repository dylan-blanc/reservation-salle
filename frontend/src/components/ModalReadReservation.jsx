import { IoClose } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth.js";

function ModalReadReservation({ reservation, onClose, onEdit, onDelete }) {
  const { user } = useAuth();
  const isOwner =
    user?.id &&
    reservation?.user_id &&
    Number(user.id) === Number(reservation.user_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 transition-all duration-300">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Organisateur
            </p>
            <h2 className="text-xl font-bold text-white">
              {reservation.organizer}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Contenu de la reunion
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-100 whitespace-pre-line wrap-break-word">
            {reservation.title}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Debut
            </p>
            <p className="text-sm text-slate-100">
              {new Date(reservation.start_date).toLocaleString("fr-FR")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Fin
            </p>
            <p className="text-sm text-slate-100">
              {new Date(reservation.end_date).toLocaleString("fr-FR")}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col gap-3">
          {isOwner && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onEdit?.(reservation)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 transition-all"
              >
                Modifier
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(reservation)}
                className="flex-1 px-4 py-3 rounded-xl border border-red-500/40 text-red-200 font-semibold hover:bg-red-500/10 transition-all"
              >
                Supprimer
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReadReservation;
