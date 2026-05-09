import React from 'react';
import PlainTemplate from './templates/PlainTemplate';
import ModernTemplate from './templates/ModernTemplate';

const ResumePreview = ({ data, template }) => {
  return (
    <div className="resume-document">
      {template === 'plain' ? (
        <PlainTemplate data={data} />
      ) : (
        <ModernTemplate data={data} />
      )}
    </div>
  );
};

export default ResumePreview;
