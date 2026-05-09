import React from 'react';

const ExecutiveTemplate = ({ data }) => {
  const { personal, summary, education, experience, skills } = data;

  return (
    <div className="template-executive">
      <div className="header">
        {personal.fullName && <h1>{personal.fullName}</h1>}
        {personal.jobTitle && <div className="job-title">{personal.jobTitle}</div>}
        <div className="contact-bar">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.address && <span>• {personal.address}</span>}
        </div>
        <div className="contact-bar" style={{ marginTop: '5px' }}>
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>• {personal.website}</span>}
        </div>
      </div>

      {summary && (
        <div className="section">
          <div className="section-title">Professional Summary</div>
          <p>{summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="section">
          <div className="section-title">Professional Experience</div>
          {experience.map(exp => (
            <div key={exp.id} className="item" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="item-header">{exp.jobTitle}</div>
                <div style={{ fontStyle: 'italic', fontSize: '13px' }}>{exp.date}</div>
              </div>
              <div style={{ marginBottom: '5px', color: '#444' }}>{exp.company}</div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="section">
          <div className="section-title">Education</div>
          {education.map(edu => (
            <div key={edu.id} className="item" style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="item-header">{edu.degree}</div>
                <div style={{ fontStyle: 'italic', fontSize: '13px' }}>{edu.date}</div>
              </div>
              <div style={{ color: '#444' }}>{edu.school}</div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="section">
          <div className="section-title">Expertise</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {skills.map((skill, index) => (
              <span key={index} style={{ fontSize: '14px' }}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
