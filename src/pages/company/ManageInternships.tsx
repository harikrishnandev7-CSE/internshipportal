import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Edit2, Trash2, Eye, Plus, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { internships } from '../../data/dummyData';
import { useAuth } from '../../hooks/useAuth';

export function ManageInternships() {
  const { user } = useAuth();
  const [list, setList] = useState(() => internships.filter((i) => i.companyId === user?.id));

  const toggleActive = (id: string) => {
    setList((prev) => prev.map((i) => (i.id === id ? { ...i, isActive: !i.isActive } : i)));
  };

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">Manage Internships</h1>
          <p className="section-subtitle">View and manage your internship postings</p>
        </div>

        <div className="space-y-3">
          {list.map((internship) => (
            <div key={internship.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{internship.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${internship.isActive ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400' : 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400'}`}>
                    {internship.isActive ? 'Active' : 'Closed'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />{internship.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />{internship.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />{internship.stipend}
                  </span>
                  <span>{internship.applications} applications</span>
                  <span>Deadline: {internship.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleActive(internship.id)} className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors" title={internship.isActive ? 'Close' : 'Reopen'}>
                  <CheckCircle className={`w-4 h-4 ${internship.isActive ? 'text-success-500' : 'text-[var(--text-muted)]'}`} />
                </button>
                <Link to={`/internship/${internship.id}`} className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors" title="View">
                  <Eye className="w-4 h-4 text-[var(--text-muted)]" />
                </Link>
                <button className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors" title="Edit">
                  <Edit2 className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No internships posted</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Create your first internship listing to attract applicants.</p>
            <Link to="/company/internships/create" className="btn-primary">
              <Plus className="w-4 h-4" />Post Internship
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
