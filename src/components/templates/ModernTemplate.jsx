import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { personal, summary, education, experience, skills } = data;

  return (
    <div className="template-modern">
      {/* Sidebar Area */}
      <div className="sidebar">
        {personal.fullName && <h1>{personal.fullName}</h1>}
        {personal.jobTitle && <div className="job-title">{personal.jobTitle}</div>}

        <div className="section">
          <div className="section-title">Contact</div>
          {personal.email && (
            <div className="contact-item">
              <Mail size={14} /> {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="contact-item">
              <Phone size={14} /> {personal.phone}
            </div>
          )}
          {personal.address && (
            <div className="contact-item">
              <MapPin size={14} /> {personal.address}
            </div>
          )}
          {personal.linkedin && (
            <div className="contact-item">
              <Linkedin size={14} /> {personal.linkedin}
            </div>
          )}
          {personal.website && (
            <div className="contact-item">
              <Globe size={14} /> {personal.website}
            </div>
          )}
        </div>

        {skills && skills.length > 0 && (
          <div className="section">
            <div className="section-title">Skills</div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        {summary && (
          <div className="section">
            <div className="section-title">Professional Profile</div>
            <p>{summary}</p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div className="section">
            <div className="section-title">Experience</div>
            {experience.map(exp => (
              <div key={exp.id} className="item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="item-header">{exp.jobTitle}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{exp.date}</div>
                </div>
                <div className="item-meta">{exp.company}</div>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {education && education.length > 0 && (
          <div className="section">
            <div className="section-title">Education</div>
            {education.map(edu => (
              <div key={edu.id} className="item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="item-header">{edu.degree}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{edu.date}</div>
                </div>
                <div className="item-meta">{edu.school}</div>
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
