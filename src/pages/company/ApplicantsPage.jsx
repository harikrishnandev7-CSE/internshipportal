import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, CheckCircle, XCircle, Star, ArrowRight, Search, Filter, GraduationCap, Briefcase } from 'lucide-react';
import { applicants } from '../../data/dummyData';

export function ApplicantsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [applicantList, setApplicantList] = useState(applicants);

  const statusOptions = ['All', 'Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected'];

  const filtered = applicantList.filter((a) => {
    const matchesSearch =
      search === '' ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.college.toLowerCase().includes(search.toLowerCase()) ||
      a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setApplicantList((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">Applicants</h1>
          <p className="section-subtitle">Review and manage all applicants for your internships</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, college, or skills..."
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field pl-10 pr-8"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((applicant) => (
            <div key={applicant.id} className="card p-5">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-semibold text-[var(--text-primary)]">{applicant.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                      applicant.status === 'Selected' ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400' :
                      applicant.status === 'Shortlisted' ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-400' :
                      applicant.status === 'Rejected' ? 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400' :
                      applicant.status === 'Under Review' ? 'bg-warning-50 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400' :
                      'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    }`}>
                      {applicant.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-3">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {applicant.college}
                    </span>
                    <span>{applicant.degree}</span>
                    <span>{applicant.year}</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      Applied {applicant.appliedDate}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {applicant.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(applicant.id, 'Shortlisted')}
                      className={`p-2 rounded-lg transition-colors ${
                        applicant.status === 'Shortlisted'
                          ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-400'
                          : 'hover:bg-[var(--bg-hover)] text-[var(--text-muted)]'
                      }`}
                      title="Shortlist"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(applicant.id, 'Selected')}
                      className={`p-2 rounded-lg transition-colors ${
                        applicant.status === 'Selected'
                          ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                          : 'hover:bg-[var(--bg-hover)] text-[var(--text-muted)]'
                      }`}
                      title="Select"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(applicant.id, 'Rejected')}
                      className={`p-2 rounded-lg transition-colors ${
                        applicant.status === 'Rejected'
                          ? 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400'
                          : 'hover:bg-[var(--bg-hover)] text-[var(--text-muted)]'
                      }`}
                      title="Reject"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="btn-outline text-sm py-2">
                    <FileText className="w-4 h-4" />
                    View Resume
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No applicants found</h3>
            <p className="text-sm text-[var(--text-muted)]">
              {search || statusFilter !== 'All'
                ? 'Try adjusting your search or filters.'
                : 'Applicants will appear here when students apply to your internships.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
