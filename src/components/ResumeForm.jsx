import React from 'react';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, AlignLeft } from 'lucide-react';

const ResumeForm = ({ data, onChange }) => {
  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const newList = [...data[section]];
      newList[index] = { ...newList[index], [field]: value };
      onChange({ ...data, [section]: newList });
    } else if (section === 'personal') {
      onChange({ ...data, personal: { ...data.personal, [field]: value } });
    } else if (section === 'summary') {
      onChange({ ...data, summary: value });
    }
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...data, skills: skillsArray });
  };

  const addItem = (section) => {
    const newItem = section === 'experience' 
      ? { id: Date.now().toString(), jobTitle: '', company: '', date: '', description: '' }
      : { id: Date.now().toString(), degree: '', school: '', date: '', description: '' };
    onChange({ ...data, [section]: [...data[section], newItem] });
  };

  const removeItem = (section, index) => {
    const newList = data[section].filter((_, i) => i !== index);
    onChange({ ...data, [section]: newList });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Personal Details */}
      <div className="form-card">
        <h2 className="form-section-title"><User size={20} /> Personal Details</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="form-input" 
              value={data.personal.fullName} 
              onChange={(e) => handleChange('personal', 'fullName', e.target.value)} 
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input 
              className="form-input" 
              value={data.personal.jobTitle} 
              onChange={(e) => handleChange('personal', 'jobTitle', e.target.value)} 
              placeholder="e.g. Frontend Developer"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              className="form-input" 
              type="email"
              value={data.personal.email} 
              onChange={(e) => handleChange('personal', 'email', e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input 
              className="form-input" 
              value={data.personal.phone} 
              onChange={(e) => handleChange('personal', 'phone', e.target.value)} 
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Address / Location</label>
            <input 
              className="form-input" 
              value={data.personal.address} 
              onChange={(e) => handleChange('personal', 'address', e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="form-card">
        <h2 className="form-section-title"><AlignLeft size={20} /> Professional Summary</h2>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <textarea 
            className="form-textarea" 
            value={data.summary} 
            onChange={(e) => handleChange('summary', null, e.target.value)}
            placeholder="A brief summary of your professional background and goals..."
          />
        </div>
      </div>

      {/* Work Experience */}
      <div className="form-card">
        <h2 className="form-section-title"><Briefcase size={20} /> Work Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="item-card">
            <button className="remove-btn" onClick={() => removeItem('experience', index)} title="Remove Item">
              <Trash2 size={16} />
            </button>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input 
                  className="form-input" 
                  value={exp.jobTitle} 
                  onChange={(e) => handleChange('experience', 'jobTitle', e.target.value, index)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input 
                  className="form-input" 
                  value={exp.company} 
                  onChange={(e) => handleChange('experience', 'company', e.target.value, index)} 
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Dates (e.g. Jan 2020 - Present)</label>
                <input 
                  className="form-input" 
                  value={exp.date} 
                  onChange={(e) => handleChange('experience', 'date', e.target.value, index)} 
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-textarea" 
                  value={exp.description} 
                  onChange={(e) => handleChange('experience', 'description', e.target.value, index)} 
                  style={{ minHeight: '80px' }}
                />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-outline add-btn" onClick={() => addItem('experience')}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="form-card">
        <h2 className="form-section-title"><GraduationCap size={20} /> Education</h2>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <button className="remove-btn" onClick={() => removeItem('education', index)} title="Remove Item">
              <Trash2 size={16} />
            </button>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Degree / Certificate</label>
                <input 
                  className="form-input" 
                  value={edu.degree} 
                  onChange={(e) => handleChange('education', 'degree', e.target.value, index)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">School / Institution</label>
                <input 
                  className="form-input" 
                  value={edu.school} 
                  onChange={(e) => handleChange('education', 'school', e.target.value, index)} 
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Dates</label>
                <input 
                  className="form-input" 
                  value={edu.date} 
                  onChange={(e) => handleChange('education', 'date', e.target.value, index)} 
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Description (Optional)</label>
                <textarea 
                  className="form-textarea" 
                  value={edu.description} 
                  onChange={(e) => handleChange('education', 'description', e.target.value, index)} 
                  style={{ minHeight: '60px' }}
                />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-outline add-btn" onClick={() => addItem('education')}>
          <Plus size={16} /> Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="form-card">
        <h2 className="form-section-title"><Code size={20} /> Skills</h2>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">List your skills (comma separated)</label>
          <input 
            className="form-input" 
            value={data.skills.join(', ')} 
            onChange={handleSkillsChange}
            placeholder="React, JavaScript, Project Management..."
          />
        </div>
      </div>

    </div>
  );
};

export default ResumeForm;
