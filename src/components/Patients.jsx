import { useState } from "react";
import Modal from "./Modal.jsx";

const VIDE = { nom: "", age: "", sexe: "H", telephone: "", maladie: "", statut: "Suivi", chambre: "-" };

const BADGE = { Hospitalisé: "red", Suivi: "blue", Sorti: "gray" };

export default function Patients({ patients, setPatients }) {
  const [recherche, setRecherche] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const [form, setForm] = useState(VIDE);
  const [editId, setEditId] = useState(null);

  const filtres = patients.filter((p) =>
    (p.nom + p.maladie).toLowerCase().includes(recherche.toLowerCase())
  );

  const ouvrirAjout = () => {
    setForm(VIDE);
    setEditId(null);
    setOuvert(true);
  };

  const ouvrirEdition = (p) => {
    setForm(p);
    setEditId(p.id);
    setOuvert(true);
  };

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enregistrer = (e) => {
    e.preventDefault();
    if (editId) {
      setPatients(patients.map((p) => (p.id === editId ? { ...form, id: editId } : p)));
    } else {
      setPatients([...patients, { ...form, id: Date.now() }]);
    }
    setOuvert(false);
  };

  const supprimer = (id) => {
    if (window.confirm("Supprimer ce patient ?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  return (
    <section className="card">
      <div className="card-head">
        <input
          className="search"
          placeholder="Rechercher un patient ou une maladie..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <button className="btn primary" onClick={ouvrirAjout}>
          + Nouveau patient
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Âge</th>
            <th>Sexe</th>
            <th>Téléphone</th>
            <th>Maladie</th>
            <th>Chambre</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtres.map((p) => (
            <tr key={p.id}>
              <td><strong>{p.nom}</strong></td>
              <td>{p.age}</td>
              <td>{p.sexe}</td>
              <td>{p.telephone}</td>
              <td>{p.maladie}</td>
              <td>{p.chambre}</td>
              <td><span className={"badge " + BADGE[p.statut]}>{p.statut}</span></td>
              <td className="actions">
                <button className="btn small" onClick={() => ouvrirEdition(p)}>Modifier</button>
                <button className="btn small danger" onClick={() => supprimer(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {filtres.length === 0 && (
            <tr><td colSpan="8" className="vide">Aucun patient trouvé</td></tr>
          )}
        </tbody>
      </table>

      {ouvert && (
        <Modal titre={editId ? "Modifier le patient" : "Nouveau patient"} onClose={() => setOuvert(false)}>
          <form onSubmit={enregistrer} className="form">
            <label>Nom complet
              <input name="nom" value={form.nom} onChange={change} required />
            </label>
            <div className="row">
              <label>Âge
                <input name="age" type="number" min="0" value={form.age} onChange={change} required />
              </label>
              <label>Sexe
                <select name="sexe" value={form.sexe} onChange={change}>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                </select>
              </label>
            </div>
            <label>Téléphone
              <input name="telephone" value={form.telephone} onChange={change} required />
            </label>
            <label>Maladie / motif
              <input name="maladie" value={form.maladie} onChange={change} required />
            </label>
            <div className="row">
              <label>Statut
                <select name="statut" value={form.statut} onChange={change}>
                  <option>Suivi</option>
                  <option>Hospitalisé</option>
                  <option>Sorti</option>
                </select>
              </label>
              <label>Chambre
                <input name="chambre" value={form.chambre} onChange={change} />
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
