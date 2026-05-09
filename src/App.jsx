import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, FileText, Paintbrush, LogOut, Save } from 'lucide-react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AuthModal from './components/AuthModal';
import SavedResumes from './components/SavedResumes';
import { supabase } from './supabase/config';

function App() {
  const [template, setTemplate] = useState('modern'); // 'plain' or 'modern'
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [view, setView] = useState('editor'); // 'editor' or 'resumes'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('editor');
  };

  const handleSaveResume = async (pdfUrl = null) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const { error } = await supabase.from('resumes').insert({
        user_id: user.id,
        data: resumeData,
        template: template,
        pdf_url: pdfUrl
      });
      
      if (error) throw error;
      
      if (!pdfUrl) alert('Resume data saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      if (!pdfUrl) alert('Failed to save resume. Please try again.');
    }
  };

  const handleSelectResume = (data) => {
    setResumeData(data);
    setView('editor');
  };
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly.',
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        date: '2015 - 2019',
        description: 'Graduated with Honors. Specialized in Software Engineering and Artificial Intelligence.'
      }
    ],
    experience: [
      {
        id: '1',
        jobTitle: 'Senior Frontend Developer',
        company: 'Tech Solutions Inc.',
        date: '2020 - Present',
        description: 'Lead a team of 5 developers to create scalable web applications using React and modern CSS. Improved application performance by 40% through code optimization.'
      },
      {
        id: '2',
        jobTitle: 'Web Developer',
        company: 'Creative Agency',
        date: '2019 - 2020',
        description: 'Developed and maintained client websites using HTML, CSS, and JavaScript. Collaborated closely with designers to ensure pixel-perfect implementations.'
      }
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Node.js', 'Git', 'UI/UX Design', 'Agile Methodologies']
  });

  const previewRef = useRef();

  const handleDownloadPdf = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const element = previewRef.current;
    const timestamp = Date.now();
    const fileName = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_${timestamp}.pdf`;
    
    const opt = {
      margin:       0,
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      // 1. Generate PDF blob
      const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
      
      // 2. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${user.id}/${fileName}`, pdfBlob);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(`${user.id}/${fileName}`);

      // 4. Save to database
      await handleSaveResume(publicUrl);

      // 5. Trigger local download using the same blob
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
      
      alert('Resume downloaded and saved to your account!');
    } catch (error) {
      console.error('Error in PDF generation/upload:', error);
      alert('Failed to process PDF. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">
          <FileText size={28} />
          Resume Builder
        </div>
        <div className="header-actions">
          <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
            <button 
              className={`btn btn-outline ${template === 'plain' ? 'active' : ''}`}
              onClick={() => setTemplate('plain')}
              style={{ border: 'none', boxShadow: template === 'plain' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
            >
              Plain
            </button>
            <button 
              className={`btn btn-outline ${template === 'modern' ? 'active' : ''}`}
              onClick={() => setTemplate('modern')}
              style={{ border: 'none', boxShadow: template === 'modern' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
            >
              Modern
            </button>
            <button 
              className={`btn btn-outline ${template === 'executive' ? 'active' : ''}`}
              onClick={() => setTemplate('executive')}
              style={{ border: 'none', position: 'relative', boxShadow: template === 'executive' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
            >
              Executive <span className="premium-badge">Pro</span>
            </button>
            <button 
              className={`btn btn-outline ${template === 'creative' ? 'active' : ''}`}
              onClick={() => setTemplate('creative')}
              style={{ border: 'none', position: 'relative', boxShadow: template === 'creative' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
            >
              Creative <span className="premium-badge">Pro</span>
            </button>
            <button 
              className={`btn btn-outline ${template === 'minimalist' ? 'active' : ''}`}
              onClick={() => setTemplate('minimalist')}
              style={{ border: 'none', position: 'relative', boxShadow: template === 'minimalist' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
            >
              Minimalist <span className="premium-badge">Pro</span>
            </button>
          </div>
          {!user && (
            <button className="btn btn-outline" onClick={() => setIsAuthModalOpen(true)} style={{ border: 'none', fontWeight: '600' }}>
              Sign In
            </button>
          )}
          {user && (
            <>
              <button 
                className={`btn btn-outline ${view === 'resumes' ? 'active' : ''}`} 
                onClick={() => setView(view === 'editor' ? 'resumes' : 'editor')}
                style={{ border: 'none' }}
              >
                {view === 'editor' ? 'My Resumes' : 'Back to Editor'}
              </button>
              <button className="btn btn-outline" onClick={handleLogout} style={{ border: 'none' }}>
                <LogOut size={16} /> Sign Out
              </button>
            </>
          )}
          {user && view === 'editor' && (
            <button className="btn btn-outline" onClick={handleSaveResume} style={{ border: 'none' }}>
              <Save size={18} /> Save
            </button>
          )}
          <button className="btn btn-primary" onClick={handleDownloadPdf}>
            {user ? <Download size={18} /> : <Save size={18} />}
            {user ? 'Download PDF' : 'Sign in to Download'}
          </button>
        </div>
      </header>

      <main className="main-content">
        {view === 'editor' ? (
          <>
            <section className="editor-section">
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </section>
            
            <section className="preview-section">
              <div ref={previewRef}>
                <ResumePreview data={resumeData} template={template} />
              </div>
            </section>
          </>
        ) : (
          <SavedResumes user={user} onSelectResume={handleSelectResume} />
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => handleDownloadPdf()}
      />
    </div>
  );
}

export default App;
