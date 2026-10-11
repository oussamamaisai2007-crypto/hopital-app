import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Patients from "./components/Patients.jsx";
import Doctors from "./components/Doctors.jsx";
import Appointments from "./components/Appointments.jsx";
import {
  initialPatients,
  initialDoctors,
  initialAppointments,
} from "./data.js";

const TITRES = {
  dashboard: "Tableau de bord",
  patients: "Patients",
  doctors: "Médecins",
  appointments: "Rendez-vous",
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);

  return (
    <div className="layout">
      <Sidebar page={page} onChange={setPage} />
      <main className="content">
        <header className="topbar">
          <h1>{TITRES[page]}</h1>
          <div className="user">
            <span className="avatar">A</span>
            <div>
              <strong>Admin</strong>
              <small>Administrateur</small>
            </div>
          </div>
        </header>

        {page === "dashboard" && (
          <Dashboard
            patients={patients}
            doctors={doctors}
            appointments={appointments}
          />
        )}
        {page === "patients" && (
          <Patients patients={patients} setPatients={setPatients} />
        )}
        {page === "doctors" && (
          <Doctors doctors={doctors} setDoctors={setDoctors} />
        )}
        {page === "appointments" && (
          <Appointments
            appointments={appointments}
            setAppointments={setAppointments}
            patients={patients}
            doctors={doctors}
          />
        )}
      </main>
    </div>
  );
}
