import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import { getClientes } from "../services/clienteService";
import { getTecnicos } from "../services/tecnicoService";
import { getTickets } from "../services/ticketService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalTecnicos: 0,
    totalTickets: 0,
    ticketsRecientes: 0
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [clientesRes, tecnicosRes, ticketsRes] = await Promise.all([
          getClientes(),
          getTecnicos(),
          getTickets()
        ]);

        const clientes = clientesRes.data;
        const tecnicos = tecnicosRes.data;
        const tickets = ticketsRes.data;

        // Calcular tickets recientes (últimos 7 días)
        const hace7Dias = new Date();
        hace7Dias.setDate(hace7Dias.getDate() - 7);
        const ticketsRecientes = tickets.filter(ticket => 
          new Date(ticket.createdAt) > hace7Dias
        ).length;

        setStats({
          totalClientes: clientes.length,
          totalTecnicos: tecnicos.length,
          totalTickets: tickets.length,
          ticketsRecientes
        });
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
        showAlert("Error al cargar datos del dashboard", 'error');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="stat-card fade-in" style={{ borderTop: `3px solid ${color}` }}>
      <div className="stat-header">
        <div className="stat-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div className="stat-trend">
          {trend}
        </div>
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-number">{loading ? "..." : value}</p>
      </div>
    </div>
  );

  return (
    <>
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
      <Navbar />
      <div className="container">
        <div className="dashboard-header">
          <h1>Panel Principal</h1>
          <p>Bienvenido al sistema de gestión de tickets</p>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Clientes"
            value={stats.totalClientes}
            icon="👥"
            color="#3b82f6"
            trend="+12%"
          />
          <StatCard
            title="Total Técnicos"
            value={stats.totalTecnicos}
            icon="🔧"
            color="#f59e0b"
            trend="+5%"
          />
          <StatCard
            title="Total Tickets"
            value={stats.totalTickets}
            icon="🎫"
            color="#8b5cf6"
            trend="+18%"
          />
          <StatCard
            title="Tickets Recientes"
            value={stats.ticketsRecientes}
            icon="📊"
            color="#10b981"
            trend="Últimos 7 días"
          />
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>Actividad Reciente</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🎫</div>
                <div className="activity-details">
                  <p>Nuevo ticket creado</p>
                  <span>Hace 2 horas</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">👥</div>
                <div className="activity-details">
                  <p>Nuevo cliente registrado</p>
                  <span>Hace 5 horas</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-details">
                  <p>Ticket completado</p>
                  <span>Hace 1 día</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Accesos Rápidos</h2>
            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => navigate('/tickets')}
              >
                <span className="quick-action-icon">➕</span>
                <span>Nuevo Ticket</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => navigate('/clientes')}
              >
                <span className="quick-action-icon">👥</span>
                <span>Agregar Cliente</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => navigate('/tecnicos')}
              >
                <span className="quick-action-icon">🔧</span>
                <span>Agregar Técnico</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
