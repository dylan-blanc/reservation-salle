import React from "react";
function Planning() {
  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const heures = Array.from({ length: 12 }, (_, i) => i + 8); // 8h00 à 19h00
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="w-full border-collapse border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-white/10">
            <th className="border border-white/10 p-2 text-slate-400 text-[10px] uppercase tracking-wider font-bold w-20">
              Heures
            </th>
            {jours.map((jour) => (
              <th
                key={jour}
                className="border border-white/10 p-2 text-slate-200 text-sm font-semibold min-w-[100px]"
              >
                {jour}
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
              {jours.map((jour) => (
                <td
                  key={`${jour}-${heure}`}
                  className="border border-white/10 p-3 group-hover:bg-white/5 hover:bg-accent/20 cursor-pointer transition-all duration-200"
                >
                  {/* Emplacement pour les futures réservations */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Planning;
