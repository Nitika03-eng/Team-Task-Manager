import React, { useState, useEffect } from 'react';
import { getTasks, updateTaskStatus } from '../api';

const EmployeeDashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();
      // Sirf wahi tasks dikhao jo is employee ko assigned hain
      const myTasks = data.filter(task => task.assignedTo === user.email);
      setTasks(myTasks);
    } catch (err) {
      console.log("Error loading tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, { status: newStatus });
      loadTasks(); // List refresh karo
    } catch (err) {
      alert("Status update failed");
    }
  };

  // Stats calculation
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    pending: tasks.filter(t => t.status !== 'Completed').length,
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #fb923c', paddingBottom: '15px' }}>
          <h2>Welcome, <span style={{ color: '#fb923c' }}>{user.name}</span></h2>
          <button onClick={onLogout} style={{ background: 'none', border: '1px solid #fb923c', color: '#fb923c', cursor: 'pointer', padding: '5px 15px', borderRadius: '4px' }}>
            Logout
          </button>
        </header>

        {/* STATS GRID (Wahi same style jo Admin ka hai) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '30px 0' }}>
          <div style={cardStyle('#00d2ff')}><h3>MY TASKS</h3><h1>{stats.total}</h1></div>
          <div style={cardStyle('#2ecc71')}><h3>COMPLETED</h3><h1>{stats.completed}</h1></div>
          <div style={cardStyle('#e74c3c')}><h3>PENDING</h3><h1>{stats.pending}</h1></div>
        </div>

        {/* TASK LIST SECTION */}
        <section style={boxStyle}>
          <h3 style={{ marginBottom: '20px', color: '#fb923c' }}>Your Assignments</h3>
          {tasks.length === 0 ? (
            <p style={{ color: '#888' }}>No tasks assigned yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {tasks.map(task => (
                <div key={task._id} style={taskItemStyle}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#fb923c' }}>{task.title}</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#ccc' }}>{task.description}</p>
                    <small style={{ color: '#888' }}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</small>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      background: task.status === 'Completed' ? '#2ecc7133' : '#f1c40f33',
                      color: task.status === 'Completed' ? '#2ecc71' : '#f1c40f'
                    }}>
                      {task.status}
                    </span>
                    
                    {task.status !== 'Completed' && (
                      <button 
                        onClick={() => handleStatusChange(task._id, 'Completed')}
                        style={actionBtnStyle}
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// --- STYLING OBJECTS (Same as Admin) ---
const cardStyle = (clr) => ({ 
  background: '#111', 
  padding: '20px', 
  borderRadius: '10px', 
  borderBottom: `4px solid ${clr}`, 
  textAlign: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
});

const boxStyle = { 
  background: '#111', 
  padding: '20px', 
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.5)' 
};

const taskItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  background: '#1a1a1a',
  borderRadius: '8px',
  border: '1px solid #333'
};

const actionBtnStyle = {
  background: '#fb923c',
  color: 'black',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '12px'
};

export default EmployeeDashboard;