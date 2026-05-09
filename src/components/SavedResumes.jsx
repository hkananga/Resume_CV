import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/config';
import { FileText, Trash2, ExternalLink, Calendar, Download } from 'lucide-react';

const SavedResumes = ({ user, onSelectResume }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchResumes = async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error fetching resumes:', error.message, error.details, error.hint);
      } else if (data) {
        console.log(`Successfully fetched ${data.length} resumes for user ${user.id}`);
        setResumes(data);
      }
      setLoading(false);
    };

    fetchResumes();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'resumes',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          fetchResumes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleDelete = async (e, id, pdfUrl) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        // Delete record from database
        const { error } = await supabase.from('resumes').delete().eq('id', id);
        if (error) throw error;

        // Delete PDF from storage if it exists
        if (pdfUrl) {
          // Extract path from public URL
          // Format: https://[project].supabase.co/storage/v1/object/public/resumes/[path]
          const pathParts = pdfUrl.split('/resumes/');
          if (pathParts.length > 1) {
            const storagePath = pathParts[1];
            await supabase.storage.from('resumes').remove([storagePath]);
          }
        }
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const formatDate = (timestampString) => {
    if (!timestampString) return 'Unknown date';
    const date = new Date(timestampString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p>Loading your resumes...</p>
      </div>
    );
  }

  return (
    <div className="saved-resumes-container">
      <h2 className="section-title mb-6">My Resumes</h2>
      
      {resumes.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500">You haven't saved any resumes yet.</p>
          <p className="text-sm text-gray-400">Generate a resume to see it here!</p>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map((resume) => (
            <div 
              key={resume.id} 
              className="resume-card"
              onClick={() => onSelectResume(resume.data)}
            >
              <div className="resume-card-icon">
                <FileText size={32} />
              </div>
              <div className="resume-card-info">
                <h3>{resume.data.personal.fullName || 'Untitled Resume'}</h3>
                <p className="job-title">{resume.data.personal.jobTitle || 'No title'}</p>
                <div className="resume-card-meta">
                  <Calendar size={12} />
                  <span>{formatDate(resume.created_at)}</span>
                </div>
              </div>
              <div className="resume-card-actions">
                {resume.pdf_url && (
                  <a 
                    href={resume.pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-btn"
                    onClick={(e) => e.stopPropagation()}
                    title="Download Saved PDF"
                  >
                    <Download size={16} />
                  </a>
                )}
                <button 
                  className="action-btn delete" 
                  onClick={(e) => handleDelete(e, resume.id, resume.pdf_url)}
                  title="Delete Resume"
                >
                  <Trash2 size={16} />
                </button>
                <button className="action-btn edit" title="Edit Resume">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedResumes;
