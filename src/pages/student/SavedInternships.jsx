import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Building2 } from 'lucide-react';
import { savedInternships, internships } from '../../data/dummyData';
import { useAuth } from '../../hooks/useAuth';

export function SavedInternships() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(() =>
    savedInternships.filter((s) => s.studentId === user?.id).map((s) => s.internshipId)
  );

  const savedList = useMemo(() => {
    return saved
      .map((id) => internships.find((i) => i.id === id))
      .filter(Boolean);
  }, [saved]);

  const removeSaved = (id) => {
    setSaved((prev) => prev.filter((sid) => sid !== id));
  };

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">Saved Internships</h1>
          <p className="section-subtitle">Internships you have bookmarked for later</p>
        </div>

        <div className="space-y-3">
          {savedList.map((internship) => (
            <div key={internship.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={internship.companyLogo}
                alt={internship.companyName}
                className="w-12 h-12 rounded-lg object-cover bg-[var(--bg-elevated)] flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{internship.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {internship.companyName}
                  </span>
                  <span>{internship.location}</span>
                  <span>{internship.duration}</span>
                  <span>{internship.stipend}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeSaved(internship.id)}
                  className="p-2 rounded-lg hover:bg-error-50 dark:hover:bg-error-900/20 text-[var(--text-muted)] hover:text-error-500 transition-colors"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <Link to={`/internship/${internship.id}`} className="btn-primary text-sm py-2">
                  <ArrowRight className="w-4 h-4" />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        {savedList.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No saved internships</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Save internships to review them later.</p>
            <Link to="/internships" className="btn-primary">
              Browse Internships
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
