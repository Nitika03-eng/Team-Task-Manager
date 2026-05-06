import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE PROJECT
  const createProject = async () => {
    if (!title || !description) {
      return alert("All fields required");
    }

    try {
      await API.post("/projects", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchProjects(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h2>Projects</h2>

      {/* CREATE PROJECT */}
      <div className="card">
        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createProject}>Create Project</button>
      </div>

      {/* PROJECT LIST */}
      <div>
        {projects.length === 0 ? (
          <p>No Projects Found</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}