import React, { useState, useEffect } from 'react';
import { getTasks, createNewTask, fetchTeam } from '../api';

const AdminDashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', assignedTo: '', dueDate: '' });

  const loadData = async () => {
    try {
      const [tRes, teamRes] = await Promise.all([getTasks(), fetchTeam()]);
      setTasks(Array.isArray(tRes.data) ? tRes.data : (tRes.data?.tasks || []));
      const rawTeam = teamRes.data?.users || teamRes.data?.team || teamRes.data || [];
      setTeam(Array.isArray(rawTeam) ? rawTeam : []);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDATION: Check if assignedTo is not empty
    if(!formData.assignedTo) return alert("Please select or type an email!");

    try {
      // Backend request
      await createNewTask(formData);
      alert("🚀 Task Assigned Successfully!");
      setFormData({ title: '', description: '', assignedTo: '', dueDate: '' });
      loadData();
    } catch (err) {
      console.error("Assignment Error:", err.response?.data);
      alert(err.response?.data?.message || "Error: 401 Unauthorized. Please Logout and Login again!");
    }
  };

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'Completed').length,
    overdue: tasks.filter(t => t.status !== 'Completed' && t.dueDate && new Date(t.dueDate) < new Date()).length
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #fb923c', paddingBottom: '15px' }}>
          <h2>Admin <span style={{ color: '#fb923c' }}>Portal</span></h2>
          <button onClick={onLogout} style={{ background: 'none', border: '1px solid #fb923c', color: '#fb923c', cursor: 'pointer', padding: '5px 15px', borderRadius: '4px' }}>Logout</button>
        </header>

        {/* STATS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '30px 0' }}>
          <div style={cardStyle('#00d2ff')}><h3>TOTAL</h3><h1>{stats.total}</h1></div>
          <div style={cardStyle('#2ecc71')}><h3>DONE</h3><h1>{stats.done}</h1></div>
          <div style={cardStyle('#ff4b2b')}><h3>OVERDUE</h3><h1>{stats.overdue}</h1></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
          <section style={boxStyle}>
            <h3 style={{ color: '#fb923c', marginBottom: '20px' }}>Assign New Task</h3>
            <form onSubmit={handleSubmit}>
              <input style={inputStyle} placeholder="Task Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              
              {/* DROPDOWN WITH MANUAL INPUT */}
              <input 
                list="emails" 
                style={inputStyle} 
                placeholder="Select or Type Employee Email" 
                value={formData.assignedTo} 
                onChange={e => setFormData({...formData, assignedTo: e.target.value})} 
                required 
              />
              <datalist id="emails">
                {team.map(m => (
                  <option key={m._id} value={m.email}>{m.name}</option>
                ))}
              </datalist>

              <input type="date" style={inputStyle} value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} required />
              <textarea style={{...inputStyle, height: '100px'}} placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#fb923c', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                Create & Assign Task
              </button>
            </form>
          </section>

          <section style={boxStyle}>
            <h3 style={{ color: '#fb923c', marginBottom: '20px' }}>Team Directory</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {team.length > 0 ? team.map(m => (
                <div key={m._id} style={{ padding: '12px', borderBottom: '1px solid #222', background: '#161616', marginBottom: '5px', borderRadius: '5px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{m.name}</p>
                  <small style={{ color: '#fb923c' }}>{m.email}</small>
                </div>
              )) : <p style={{ color: '#666' }}>No users found. Ensure they are registered.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const cardStyle = (clr) => ({ background: '#111', padding: '20px', borderRadius: '10px', borderBottom: `4px solid ${clr}`, textAlign: 'center' });
const boxStyle = { background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #222' };
const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', background: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '4px' };

export default AdminDashboard;