export const initialPatients = [
  { id: 1, nom: "Amine Benali", age: 34, sexe: "H", telephone: "0612345678", maladie: "Diabète", statut: "Hospitalisé", chambre: "A-101" },
  { id: 2, nom: "Salma El Idrissi", age: 28, sexe: "F", telephone: "0623456789", maladie: "Grossesse", statut: "Suivi", chambre: "-" },
  { id: 3, nom: "Youssef Amrani", age: 61, sexe: "H", telephone: "0634567890", maladie: "Hypertension", statut: "Hospitalisé", chambre: "B-204" },
  { id: 4, nom: "Khadija Tazi", age: 45, sexe: "F", telephone: "0645678901", maladie: "Asthme", statut: "Sorti", chambre: "-" },
  { id: 5, nom: "Omar Bennani", age: 19, sexe: "H", telephone: "0656789012", maladie: "Fracture du bras", statut: "Suivi", chambre: "-" },
  { id: 6, nom: "Imane Chraibi", age: 52, sexe: "F", telephone: "0667890123", maladie: "Cardiopathie", statut: "Hospitalisé", chambre: "C-310" },
];

export const initialDoctors = [
  { id: 1, nom: "Dr. Karim Alaoui", specialite: "Cardiologie", telephone: "0600112233", disponible: true },
  { id: 2, nom: "Dr. Nadia Fassi", specialite: "Gynécologie", telephone: "0600223344", disponible: true },
  { id: 3, nom: "Dr. Hamza Berrada", specialite: "Orthopédie", telephone: "0600334455", disponible: false },
  { id: 4, nom: "Dr. Leila Mansouri", specialite: "Pédiatrie", telephone: "0600445566", disponible: true },
  { id: 5, nom: "Dr. Rachid Ouazzani", specialite: "Médecine générale", telephone: "0600556677", disponible: false },
];

export const initialAppointments = [
  { id: 1, patient: "Amine Benali", medecin: "Dr. Karim Alaoui", date: "2026-10-12", heure: "09:00", statut: "Confirmé" },
  { id: 2, patient: "Salma El Idrissi", medecin: "Dr. Nadia Fassi", date: "2026-10-12", heure: "10:30", statut: "En attente" },
  { id: 3, patient: "Omar Bennani", medecin: "Dr. Hamza Berrada", date: "2026-10-13", heure: "11:00", statut: "Confirmé" },
  { id: 4, patient: "Khadija Tazi", medecin: "Dr. Rachid Ouazzani", date: "2026-10-14", heure: "14:00", statut: "Annulé" },
];
