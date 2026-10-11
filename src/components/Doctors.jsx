import { useState } from "react";
import Modal from "./Modal.jsx";

const VIDE = { nom: "Dr. ", specialite: "", telephone: "", disponible: true };

export default function Doctors({ doctors, setDoctors }) {
  const [ouvert, setOuvert] = useState(false);
  const [form, setForm] = useState(VIDE);

  const ajouter = (e) => {
    e.preventDefault();
    setDoctors([...doctors, { ...form, id: Date.now() }]);
    setOuvert(false);
    setForm(VIDE);
  };

  const basculer = (id) =>
    setDoctors(doctors.map((d) => (d.id === id ? { ...d, disponible: !d.disponible } : d)));

  const supprimer = (id) => {
    if (window.confirm("Supprimer ce médecin ?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  const initiales = (nom) =>
    nom.replace("Dr. ", "").split(" ").map((m) => m[0]).join("").slice(0, 2);

  return (
    <>
      <div className="page-actions">
        <button className="btn primary" onClick={() => setOuvert(true)}>
          + Nouveau médecin
        </button>
      </div>

      <section className="grid">
        {doctors.map((d) => (
          <article key={d.id} className="doctor-card">
            <span className="avatar big">{initiales(d.nom)}</span>
            <h3>{d.nom}</h3>
            <p className="muted">{d.specialite}</p>
            <p className="muted">{d.telephone}</p>
            <span className={"badge " + (d.disponible ? "green" : "gray")}>
              {d.disponible ? "Disponible" : "Indisponible"}
            </span>
            <div className="card-actions">
              <button className="btn small" onClick={() => basculer(d.id)}>
                Changer le statut
              </button>
              <button className="btn small danger" onClick={() => supprimer(d.id)}>
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </section>

      {ouvert && (
        <Modal titre="Nouveau médecin" onClose={() => setOuvert(false)}>
          <form onSubmit={ajouter} className="form">
            <label>Nom
              <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
            </label>
            <label>Spécialité
              <input value={form.specialite} onChange={(e) => setForm({ ...form, specialite: e.target.value })} required />
            </label>
            <label>Téléphone
              <input value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} required />
            </label>
            <div className="form-actions">
              <button type="button" className="btn" onClick={() => setOuvert(false)}>Annuler</button>
              <button type="submit" className="btn primary">Enregistrer</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
