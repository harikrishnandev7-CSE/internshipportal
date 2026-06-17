import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Building2, Calendar } from 'lucide-react';
import { applications } from '../../data/dummyData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../hooks/useAuth';

export function MyApplications() {
  const { user } = useAuth();
  const myApps = useMemo(() =>
    applications.filter((a) => a.studentId === user?.id).sort((a, b) => b.appliedDate.localeCompare(a.appliedDate)),
    [user]
  );

  const statusFilter = ['All', 'Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected'] as const;
  const [filter, setFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return myApps;
    return myApps.filter((a) => a.status === filter);
  }, [filter, myApps]);

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">My Applications</h1>
          <p className="section-subtitle">Track all your internship applications</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilter.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-primary-600 text-white'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((app) => (
            <div key={app.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{app.internshipTitle}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {app.companyName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Applied {app.appliedDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={app.status} />
                <Link to={`/internship/${app.internshipId}`} className="btn-outline text-sm py-2">
                  <ArrowRight className="w-4 h-4" />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No applications found</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Start applying to internships to see them here.</p>
            <Link to="/internships" className="btn-primary">
              Browse Internships
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


