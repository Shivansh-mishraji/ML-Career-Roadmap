import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, MapPin, DollarSign, Building, Calendar, Trash2 } from 'lucide-react';

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({ company: '', role: '', status: 'Applied', location: '', salary: '' });

  const statuses = ['Saved', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

  useEffect(() => {
    const saved = localStorage.getItem('ml-job-tracker');
    if (saved) {
      setJobs(JSON.parse(saved));
    } else {
      // Default mock data
      setJobs([
        { id: '1', company: 'TechNova', role: 'ML Engineer', status: 'Interviewing', location: 'Remote', salary: '$120k', date: '2026-05-10' },
        { id: '2', company: 'DataSphere', role: 'Data Scientist', status: 'Applied', location: 'New York', salary: '$110k', date: '2026-06-01' },
      ]);
    }
  }, []);

  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem('ml-job-tracker', JSON.stringify(updatedJobs));
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.company || !newJob.role) return;
    const newEntry = {
      ...newJob,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    saveJobs([...jobs, newEntry]);
    setIsModalOpen(false);
    setNewJob({ company: '', role: '', status: 'Applied', location: '', salary: '' });
  };

  const deleteJob = (id) => {
    saveJobs(jobs.filter(j => j.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    saveJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Saved': return 'var(--text-muted)';
      case 'Applied': return 'var(--accent-primary)';
      case 'Interviewing': return 'var(--warning)';
      case 'Offer': return 'var(--success)';
      case 'Rejected': return 'var(--danger)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="job-tracker-container"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h1 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>// Career_Pipeline</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
            Track your job applications and interview progress.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Application
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {statuses.map(status => (
          <div key={status} className="glass-card-premium" style={{ padding: '1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: `2px solid ${getStatusColor(status)}`, paddingBottom: '0.5rem' }}>
              <h3 className="mono" style={{ fontSize: '1.1rem', color: '#fff' }}>{status}</h3>
              <span style={{ background: 'var(--bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-lg)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {jobs.filter(j => j.status === status).length}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {jobs.filter(j => j.status === status).map(job => (
                <motion.div 
                  layoutId={job.id}
                  key={job.id} 
                  className="glass-card" 
                  style={{ padding: '1rem', cursor: 'grab', borderLeft: `3px solid ${getStatusColor(status)}` }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {job.role}
                    </h4>
                    <button onClick={() => deleteJob(job.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}>
                      <Trash2 size={14} className="hover-danger" />
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <Building size={14} /> {job.company}
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {job.location && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        <MapPin size={12} /> {job.location}
                      </span>
                    )}
                    {job.salary && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        <DollarSign size={12} /> {job.salary}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Calendar size={12} /> {job.date}
                    </span>
                    <select 
                      value={job.status} 
                      onChange={(e) => updateStatus(job.id, e.target.value)}
                      className="mono"
                      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', outline: 'none' }}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card-premium" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}
            >
              <h2 className="mono" style={{ marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Briefcase size={20} color="var(--accent-primary)" /> New Application
              </h2>
              <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Company *</label>
                  <input required value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} type="text" style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: 'var(--radius-sm)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Role *</label>
                  <input required value={newJob.role} onChange={e => setNewJob({...newJob, role: e.target.value})} type="text" style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: 'var(--radius-sm)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Location</label>
                    <input value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} type="text" style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: 'var(--radius-sm)', outline: 'none' }} placeholder="e.g. Remote, NY" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Salary</label>
                    <input value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} type="text" style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: 'var(--radius-sm)', outline: 'none' }} placeholder="e.g. $120k" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Status</label>
                  <select value={newJob.status} onChange={e => setNewJob({...newJob, status: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: 'var(--radius-sm)', outline: 'none' }}>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobTracker;
