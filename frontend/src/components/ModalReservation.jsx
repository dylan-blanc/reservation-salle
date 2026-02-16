import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

function ModalReservation({ isOpen, onClose, slotData }) {
  const [motif, setMotif] = useState("");
  const [heureDebut, setHeureDebut] = useState(
    slotData ? `${slotData.heure.toString().padStart(2, "0")}:00` : "",
  );
  const [heureFin, setHeureFin] = useState(
    slotData ? `${(slotData.heure + 1).toString().padStart(2, "0")}:00` : "",
  );

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Réservation:", {
      jour: slotData.jour.nom,
      motif,
      heureDebut,
      heureFin,
    });
    // Ici on ferait normalement l'appel API
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Réserver pour {" "}
            <span className="text-accent">{slotData.jour.nom}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Motif de la réservation
            </label>
            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Ex: Réunion d'équipe"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Début
              </label>
              <select
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none"
              >
                {Array.from({ length: 11 }, (_, i) => i + 8).map((h) => {
                  const time = `${h.toString().padStart(2, "0")}:00`;
                  return (
                    <option key={time} value={time} className="bg-slate-900">
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Fin</label>
              <select
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none"
              >
                {Array.from({ length: 11 }, (_, i) => i + 9).map((h) => {
                  const time = `${h.toString().padStart(2, "0")}:00`;
                  return (
                    <option key={time} value={time} className="bg-slate-900">
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/80 shadow-lg shadow-accent/20 transition-all"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalReservation;
