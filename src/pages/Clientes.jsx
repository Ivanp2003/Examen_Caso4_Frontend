import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../services/clienteService";
import Alert from "../components/Alert";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", apellido: "", cedula: "", email: "", telefono: "" });
  const [editing, setEditing] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
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

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editing) {
        await updateCliente(editing, form);
        showAlert("Cliente actualizado exitosamente", 'success');
      } else {
        await createCliente(form);
        showAlert("Cliente creado exitosamente", 'success');
      }
      setForm({ nombre: "", apellido: "", cedula: "", email: "", telefono: "" });
      setEditing(null);
      cargarClientes();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      showAlert("Error al guardar cliente", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cliente) => {
    setForm(cliente);
    setEditing(cliente._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar cliente?")) {
      try {
        setLoading(true);
        await deleteCliente(id);
        showAlert("Cliente eliminado exitosamente", 'success');
        cargarClientes();
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        showAlert("Error al eliminar cliente", 'error');
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
          <h2>{editing ? "Editar Cliente" : "Agregar Cliente"}</h2>
          
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Cédula"
              value={form.cedula}
              onChange={(e) => setForm({ ...form, cedula: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
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
                  setForm({ nombre: "", apellido: "", cedula: "", email: "", telefono: "" }); 
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
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td>
                    <button 
                      className="btn btn-edit" 
                      onClick={() => handleEdit(cliente)}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(cliente._id)}
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

export default Clientes;
