export default function Dashboard({ patients, doctors, appointments }) {
  const hospitalises = patients.filter((p) => p.statut === "Hospitalisé").length;
  const disponibles = doctors.filter((d) => d.disponible).length;
  const rdvActifs = appointments.filter((a) => a.statut !== "Annulé").length;

  const stats = [
    { label: "Patients", valeur: patients.length, couleur: "blue", icon: "☺" },
    { label: "Hospitalisés", valeur: hospitalises, couleur: "red", icon: "▣" },
    { label: "Médecins disponibles", valeur: `${disponibles}/${doctors.length}`, couleur: "green", icon: "✚" },
    { label: "Rendez-vous actifs", valeur: rdvActifs, couleur: "orange", icon: "◷" },
  ];

  const prochains = [...appointments]
    .filter((a) => a.statut !== "Annulé")
    .sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure))
    .slice(0, 5);

  return (
    <>
      <section className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span className={"stat-icon " + s.couleur}>{s.icon}</span>
            <div>
              <strong>{s.valeur}</strong>
              <small>{s.label}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <h2>Prochains rendez-vous</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Médecin</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {prochains.map((a) => (
              <tr key={a.id}>
                <td>{a.patient}</td>
                <td>{a.medecin}</td>
                <td>{a.date}</td>
                <td>{a.heure}</td>
                <td>
                  <span className={"badge " + (a.statut === "Confirmé" ? "green" : "orange")}>
                    {a.statut}
                  </span>
                </td>
              </tr>
            ))}
            {prochains.length === 0 && (
              <tr>
                <td colSpan="5" className="vide">Aucun rendez-vous à venir</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
