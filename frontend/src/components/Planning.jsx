import React, { useState } from "react";
import ModalReservation from "./ModalReservation";

function Planning() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // On utilise des objets pour lier l'ID (getDay) et le Nom
  const jours = [
    { id: 1, nom: "Lundi" },
    { id: 2, nom: "Mardi" },
    { id: 3, nom: "Mercredi" },
    { id: 4, nom: "Jeudi" },
    { id: 5, nom: "Vendredi" },
  ];
  const heures = Array.from({ length: 12 }, (_, i) => i + 8); // 8h à 19h

  // Récupérer le jour actuel pour le style
  const aujourdhui = new Date().getDay();

  const handleSlotClick = (jour, heure) => {
    setSelectedSlot({ jour, heure });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="w-full border-collapse border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-white/10">
            <th className="border border-white/10 p-2 text-slate-400 text-[10px] uppercase tracking-wider font-bold w-20">
              Heures
            </th>
            {jours.map((j) => (
              <th
                key={j.id}
                className={`border border-white/10 p-2 text-sm font-semibold min-w-[100px] ${
                  aujourdhui === j.id
                    ? "text-accent bg-accent/10"
                    : "text-slate-200"
                }`}
              >
                {j.nom}
                {aujourdhui === j.id && (
                  <span className="block text-[9px] uppercase font-bold text-accent">
                    Aujourd'hui
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heures.map((heure) => (
            <tr key={heure} className="group transition-colors">
              <td className="border border-white/10 p-2 text-center text-slate-400 font-mono text-xs bg-white/5">
                {heure.toString().padStart(2, "0")}:00
              </td>
              {jours.map((j) => (
                <td
                  key={`${j.id}-${heure}`}
                  onClick={() => handleSlotClick(j, heure)}
                  className={`border border-white/10 p-3 group-hover:bg-white/5 hover:bg-accent/20 cursor-pointer transition-all duration-200 ${
                    aujourdhui === j.id ? "bg-accent/5" : ""
                  }`}
                >
                  {/* Les réservations viendront ici */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ModalReservation
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          slotData={selectedSlot}
        />
      )}
    </div>
  );
}

export default Planning;
