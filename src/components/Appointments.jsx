import { useState } from "react";
import Modal from "./Modal.jsx";

const BADGE = { Confirmé: "green", "En attente": "orange", Annulé: "gray" };

export default function Appointments({ appointments, setAppointments, patients, doctors }) {
  const [ouvert, setOuvert] = useState(false);
  const [form, setForm] = useState({ patient: "", medecin: "", date: "", heure: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const ajouter = (e) => {
    e.preventDefault();
    setAppointments([...appointments, { ...form, id: Date.now(), statut: "En attente" }]);
    setOuvert(false);
    setForm({ patient: "", medecin: "", date: "", heure: "" });
  };

  const changerStatut = (id, statut) =>
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, statut } : a)));

  const trie = [...appointments].sort((a, b) =>
    (a.date + a.heure).localeCompare(b.date + b.heure)
  );

  return (
    <section className="card">
      <div className="card-head">
        <h2>Planning des rendez-vous</h2>
        <button className="btn primary" onClick={() => setOuvert(true)}>
          + Nouveau rendez-vous
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Médecin</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trie.map((a) => (
            <tr key={a.id}>
              <td><strong>{a.patient}</strong></td>
              <td>{a.medecin}</td>
              <td>{a.date}</td>
              <td>{a.heure}</td>
              <td><span className={"badge " + BADGE[a.statut]}>{a.statut}</span></td>
              <td className="actions">
                {a.statut !== "Confirmé" && a.statut !== "Annulé" && (
                  <button className="btn small" onClick={() => changerStatut(a.id, "Confirmé")}>
                    Confirmer
                  </button>
                )}
                {a.statut !== "Annulé" && (
                  <button className="btn small danger" onClick={() => changerStatut(a.id, "Annulé")}>
                    Annuler
                  </button>
                )}
              </td>
            </tr>
          ))}
          {trie.length === 0 && (
            <tr><td colSpan="6" className="vide">Aucun rendez-vous</td></tr>
          )}
        </tbody>
      </table>

      {ouvert && (
        <Modal titre="Nouveau rendez-vous" onClose={() => setOuvert(false)}>
          <form onSubmit={ajouter} className="form">
            <label>Patient
              <select name="patient" value={form.patient} onChange={change} required>
                <option value="">Choisir...</option>
                {patients.map((p) => <option key={p.id}>{p.nom}</option>)}
              </select>
            </label>
            <label>Médecin
              <select name="medecin" value={form.medecin} onChange={change} required>
                <option value="">Choisir...</option>
                {doctors.filter((d) => d.disponible).map((d) => <option key={d.id}>{d.nom}</option>)}
              </select>
            </label>
            <div className="row">
              <label>Date
                <input name="date" type="date" value={form.date} onChange={change} required />
              </label>
              <label>Heure
                <input name="heure" type="time" value={form.heure} onChange={change} required />
              </label>
            </div>
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setOuvert(false)}>Annuler</button>
              <button type="submit" className="btn primary">Enregistrer</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
