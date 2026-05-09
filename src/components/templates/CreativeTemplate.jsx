import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const CreativeTemplate = ({ data }) => {
  const { personal, summary, education, experience, skills } = data;

  return (
    <div className="template-creative">
      <div className="sidebar">
        {personal.fullName && <h1>{personal.fullName}</h1>}
        {personal.jobTitle && <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '30px' }}>{personal.jobTitle}</div>}

        <div className="section" style={{ marginBottom: '40px' }}>
          <div className="section-title">Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {personal.email && <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}><Mail size={14} /> {personal.email}</div>}
            {personal.phone && <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}><Phone size={14} /> {personal.phone}</div>}
            {personal.address && <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}><MapPin size={14} /> {personal.address}</div>}
            {personal.website && <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}><Globe size={14} /> {personal.website}</div>}
          </div>
        </div>

        {skills && skills.length > 0 && (
          <div className="section">
            <div className="section-title">Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="main">
        {summary && (
          <div className="section" style={{ marginBottom: '40px' }}>
            <div className="section-title">Profile</div>
            <p style={{ fontSize: '15px', color: '#4a5568' }}>{summary}</p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div className="section" style={{ marginBottom: '40px' }}>
            <div className="section-title">Experience</div>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '25px' }}>
                <div style={{ fontWeight: '800', fontSize: '16px', color: '#2d3748' }}>{exp.jobTitle}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#718096', margin: '4px 0' }}>
                  <span>{exp.company}</span>
                  <span>{exp.date}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#4a5568' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {education && education.length > 0 && (
          <div className="section">
            <div className="section-title">Education</div>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '20px' }}>
                <div style={{ fontWeight: '800', fontSize: '16px', color: '#2d3748' }}>{edu.degree}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#718096', margin: '4px 0' }}>
                  <span>{edu.school}</span>
                  <span>{edu.date}</span>
                </div>
                {edu.description && <p style={{ fontSize: '14px', color: '#4a5568' }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
