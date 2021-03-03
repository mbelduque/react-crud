import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import { addDocument, getCollection } from "./actions";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const addTask = async (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }
    const result = await addDocument("tasks", { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    setTasks([...tasks, { id: result.data.id, name: task }]);
    setTask("");
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    setEditMode(false);
    setTask("");
  };

  const editTask = (task) => {
    setTask(task.name);
    setEditMode(true);
    setId(task.id);
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }
    const editedTasks = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editedTasks);
    setEditMode(false);
    setId("");
    setTask("");
  };

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("Debe ingresar la tarea!");
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks");
      if (result.statusResponse) {
        setTasks(result.data);
      }
    })();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center mb-2">Lista de Tareas</h4>
          {size(tasks) === 0 ? (
            <ul>
              <li className="list-group-item">
                Aun no hay tareas programadas!
              </li>
            </ul>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center mb-2">
            {editMode ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            {error && <span className="text-danger">{error}</span>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(Text) => setTask(Text.target.value)}
              value={task}
              aria-label="Ingreses la tarea..."
            />
            <button
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
