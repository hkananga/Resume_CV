import React from 'react';

const PlainTemplate = ({ data }) => {
  const { personal, summary, education, experience, skills } = data;

  return (
    <div className="template-plain">
      <header>
        <h1>{personal.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span> | {personal.phone}</span>}
          {personal.address && <span> | {personal.address}</span>}
          {personal.linkedin && <span> | {personal.linkedin}</span>}
          {personal.website && <span> | {personal.website}</span>}
        </div>
      </header>

      {summary && (
        <section className="section">
          <div className="section-title">Summary</div>
          <p>{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="section">
          <div className="section-title">Experience</div>
          {experience.map(exp => (
            <div key={exp.id} className="item">
              <div className="item-header">
                <span>{exp.jobTitle}</span>
                <span>{exp.date}</span>
              </div>
              <div className="item-sub">
                <span>{exp.company}</span>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className="section">
          <div className="section-title">Education</div>
          {education.map(edu => (
            <div key={edu.id} className="item">
              <div className="item-header">
                <span>{edu.school}</span>
                <span>{edu.date}</span>
              </div>
              <div className="item-sub">
                <span>{edu.degree}</span>
              </div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="section">
          <div className="section-title">Skills</div>
          <div className="skills-list">
            {skills.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default PlainTemplate;
