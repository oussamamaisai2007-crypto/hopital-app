const LIENS = [
  { id: "dashboard", label: "Tableau de bord", icon: "▦" },
  { id: "patients", label: "Patients", icon: "☺" },
  { id: "doctors", label: "Médecins", icon: "✚" },
  { id: "appointments", label: "Rendez-vous", icon: "◷" },
];

export default function Sidebar({ page, onChange }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">✚</span>
        <span>MediCare</span>
      </div>
      <nav>
        {LIENS.map((l) => (
          <button
            key={l.id}
            className={"nav-btn" + (page === l.id ? " active" : "")}
            onClick={() => onChange(l.id)}
          >
            <span className="nav-icon">{l.icon}</span>
            {l.label}
          </button>
        ))}
      </nav>
      <p className="sidebar-foot">Gestion d'hôpital · v1.0</p>
    </aside>
  );
}
