import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getTickets, createTicket, updateTicket, deleteTicket } from "../services/ticketService";
import { getClientes } from "../services/clienteService";
import { getTecnicos } from "../services/tecnicoService";
import Alert from "../components/Alert";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [form, setForm] = useState({ codigo: "", descripcion: "", cliente: "", tecnico: "" });
  const [editing, setEditing] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  const cargarTickets = async () => {
    try {
      setLoading(true);
      const res = await getTickets();
      setTickets(res.data);
    } catch (error) {
      console.error("Error al cargar tickets:", error);
      showAlert("Error al cargar tickets", 'error');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const res = await getClientes();
      setClientes(res.data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      showAlert("Error al cargar clientes", 'error');
    } finally {
      setLoading(false);
    }
  };

  const cargarTecnicos = async () => {
    try {
      setLoading(true);
      const res = await getTecnicos();
      setTecnicos(res.data);
    } catch (error) {
      console.error("Error al cargar técnicos:", error);
      showAlert("Error al cargar técnicos", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTickets();
    cargarClientes();
    cargarTecnicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        codigo: parseInt(form.codigo),
        descripcion: form.descripcion,
        tecnico: form.tecnico,
        cliente: form.cliente
      };

      if (editing) {
        await updateTicket(editing, data);
        showAlert("Ticket actualizado exitosamente", 'success');
      } else {
        await createTicket(data);
        showAlert("Ticket creado exitosamente", 'success');
      }
      setForm({ codigo: "", descripcion: "", cliente: "", tecnico: "" });
      setEditing(null);
      cargarTickets();
    } catch (error) {
      console.error("Error al guardar ticket:", error);
      showAlert("Error al guardar ticket", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ticket) => {
    setForm({
      codigo: ticket.codigo,
      descripcion: ticket.descripcion,
      cliente: ticket.cliente._id,
      tecnico: ticket.tecnico._id
    });
    setEditing(ticket._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar ticket?")) {
      try {
        setLoading(true);
        await deleteTicket(id);
        showAlert("Ticket eliminado exitosamente", 'success');
        cargarTickets();
      } catch (error) {
        console.error("Error al eliminar ticket:", error);
        showAlert("Error al eliminar ticket", 'error');
      } finally {
        setLoading(false);
      }
    }
  };

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
        <form onSubmit={handleSubmit} className="form fade-in">
          <h2>{editing ? "Editar Ticket" : "Agregar Ticket"}</h2>
          
          <div className="form-grid">
            <input
              type="number"
              placeholder="Código"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              required
            />
            <textarea
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              required
            />
            <select
              value={form.cliente}
              onChange={(e) => setForm({ ...form, cliente: e.target.value })}
              required
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map(c => (
                <option key={c._id} value={c._id}>
                  {c.nombre} {c.apellido} - {c.cedula}
                </option>
              ))}
            </select>
            <select
              value={form.tecnico}
              onChange={(e) => setForm({ ...form, tecnico: e.target.value })}
              required
            >
              <option value="">Seleccionar Técnico</option>
              {tecnicos.map(t => (
                <option key={t._id} value={t._id}>
                  {t.nombre} {t.apellido} - {t.especialidad}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button type="submit" disabled={loading}>
              {loading && <span className="spinner"></span>}
              {editing ? "Actualizar" : "Agregar"}
            </button>
            {editing && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditing(null); 
                  setForm({ codigo: "", descripcion: "", cliente: "", tecnico: "" }); 
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="table-container fade-in">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Cliente</th>
                <th>Técnico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.codigo}</td>
                  <td>{ticket.descripcion}</td>
                  <td>{ticket.cliente?.nombre} {ticket.cliente?.apellido}</td>
                  <td>{ticket.tecnico?.nombre} {ticket.tecnico?.apellido}</td>
                  <td>
                    <button 
                      className="btn btn-edit" 
                      onClick={() => handleEdit(ticket)}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(ticket._id)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tickets;
