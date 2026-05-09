import React from 'react';
import PlainTemplate from './templates/PlainTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';

const ResumePreview = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'plain':
        return <PlainTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="resume-document">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
