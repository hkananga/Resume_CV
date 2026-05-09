import React from 'react';

const MinimalistTemplate = ({ data }) => {
  const { personal, summary, education, experience, skills } = data;

  return (
    <div className="template-minimalist">
      <div className="header">
        {personal.fullName && <h1>{personal.fullName}</h1>}
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#718096', marginTop: '10px' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {summary && (
        <div className="section">
          <div className="section-label">Summary</div>
          <div className="section-content">
            <p style={{ fontSize: '15px', lineHeight: '1.6' }}>{summary}</p>
          </div>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="section">
          <div className="section-label">Experience</div>
          <div className="section-content">
            {experience.map(exp => (
              <div key={exp.id} className="item">
                <div className="item-title">{exp.jobTitle}</div>
                <div className="item-meta">{exp.company} | {exp.date}</div>
                <p style={{ fontSize: '14px' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education && education.length > 0 && (
        <div className="section">
          <div className="section-label">Education</div>
          <div className="section-content">
            {education.map(edu => (
              <div key={edu.id} className="item">
                <div className="item-title">{edu.degree}</div>
                <div className="item-meta">{edu.school} | {edu.date}</div>
                {edu.description && <p style={{ fontSize: '14px' }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="section">
          <div className="section-label">Skills</div>
          <div className="section-content">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map((skill, index) => (
                <span key={index} style={{ fontSize: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
