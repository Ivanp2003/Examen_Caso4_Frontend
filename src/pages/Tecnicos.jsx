import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getTecnicos, createTecnico, updateTecnico, deleteTecnico } from "../services/tecnicoService";
import Alert from "../components/Alert";

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [form, setForm] = useState({ 
    nombre: "", 
    apellido: "", 
    cedula: "", 
    fecha_nacimiento: "", 
    genero: "", 
    direccion: "", 
    telefono: "", 
    email: "" 
  });
  const [editing, setEditing] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
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
    cargarTecnicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editing) {
        await updateTecnico(editing, form);
        showAlert("Técnico actualizado exitosamente", 'success');
      } else {
        await createTecnico(form);
        showAlert("Técnico creado exitosamente", 'success');
      }
      setForm({ 
        nombre: "", 
        apellido: "", 
        cedula: "", 
        fecha_nacimiento: "", 
        genero: "", 
        direccion: "", 
        telefono: "", 
        email: "" 
      });
      setEditing(null);
      cargarTecnicos();
    } catch (error) {
      console.error("Error al guardar técnico:", error);
      showAlert("Error al guardar técnico", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tecnico) => {
    setForm(tecnico);
    setEditing(tecnico._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar técnico?")) {
      try {
        setLoading(true);
        await deleteTecnico(id);
        showAlert("Técnico eliminado exitosamente", 'success');
        cargarTecnicos();
      } catch (error) {
        console.error("Error al eliminar técnico:", error);
        showAlert("Error al eliminar técnico", 'error');
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
          <h2>{editing ? "Editar Técnico" : "Agregar Técnico"}</h2>
          
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
              type="date"
              placeholder="Fecha de Nacimiento"
              value={form.fecha_nacimiento}
              onChange={(e) => setForm({ ...form, fecha_nacimiento: e.target.value })}
              required
            />
            <select
              value={form.genero}
              onChange={(e) => setForm({ ...form, genero: e.target.value })}
              required
            >
              <option value="">Seleccionar Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <input
              type="text"
              placeholder="Dirección"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
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
                  setForm({ 
                    nombre: "", 
                    apellido: "", 
                    cedula: "", 
                    fecha_nacimiento: "", 
                    genero: "", 
                    direccion: "", 
                    telefono: "", 
                    email: "" 
                  }); 
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
                <th>Fecha de Nacimiento</th>
                <th>Género</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tecnicos.map((tecnico) => (
                <tr key={tecnico._id}>
                  <td>{tecnico.nombre}</td>
                  <td>{tecnico.apellido}</td>
                  <td>{tecnico.cedula}</td>
                  <td>{tecnico.fecha_nacimiento}</td>
                  <td>{tecnico.genero}</td>
                  <td>{tecnico.direccion}</td>
                  <td>{tecnico.telefono}</td>
                  <td>{tecnico.email}</td>
                  <td>
                    <button 
                      className="btn btn-edit" 
                      onClick={() => handleEdit(tecnico)}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(tecnico._id)}
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

export default Tecnicos;
