import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  // FETCH PROJECTS (for dropdown)
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("PROJECT ERROR:", err);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    if (!projectId) return;

    try {
      const res = await API.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.log("TASK FETCH ERROR:", err);
    }
  };

  // CREATE TASK
  const createTask = async () => {
    if (!title || !description || !projectId) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const res = await API.post("/tasks", {
        title,
        description,
        projectId,
      });

      console.log("CREATED:", res.data);

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data || err.message);
      alert("Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className="container">
      <h2>Tasks</h2>

      {/* SELECT PROJECT */}
      <div className="card">
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* CREATE TASK */}
      <div className="card">
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createTask} disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>

      {/* TASK LIST */}
      <div>
        {tasks.length === 0 ? (
          <p>No Tasks Found</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>

              <button onClick={() => updateStatus(task._id, "todo")}>
                Todo
              </button>
              <button onClick={() => updateStatus(task._id, "in-progress")}>
                In Progress
              </button>
              <button onClick={() => updateStatus(task._id, "done")}>
                Done
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}