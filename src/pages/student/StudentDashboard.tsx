import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Bookmark, CheckCircle, XCircle, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { applications, internships, savedInternships } from '../../data/dummyData';
import { InternshipCard } from '../../components/common/InternshipCard';
import { useAuth } from '../../hooks/useAuth';

export function StudentDashboard() {
  const { user } = useAuth();
  const myApplications = useMemo(() => applications.filter((a) => a.studentId === user?.id), [user]);
  const mySaved = useMemo(() => savedInternships.filter((s) => s.studentId === user?.id), [user]);

  const stats = {
    total: myApplications.length,
    shortlisted: myApplications.filter((a) => a.status === 'Shortlisted').length,
    rejected: myApplications.filter((a) => a.status === 'Rejected').length,
    selected: myApplications.filter((a) => a.status === 'Selected').length,
  };

  const recentActivity = [...myApplications].sort((a, b) => b.appliedDate.localeCompare(a.appliedDate)).slice(0, 5);
  const recommended = internships.slice(0, 3);

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">Student Dashboard</h1>
          <p className="section-subtitle">Welcome back, {user?.name}! Here is your overview.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-600" />
              </div>
              <span className="stat-label">Total Applications</span>
            </div>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary-50 dark:bg-secondary-900/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-secondary-600" />
              </div>
              <span className="stat-label">Shortlisted</span>
            </div>
            <span className="stat-value">{stats.shortlisted}</span>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-error-50 dark:bg-error-900/20 flex items-center justify-center">
                <XCircle className="w-4 h-4 text-error-600" />
              </div>
              <span className="stat-label">Rejected</span>
            </div>
            <span className="stat-value">{stats.rejected}</span>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-success-50 dark:bg-success-900/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success-600" />
              </div>
              <span className="stat-label">Selected</span>
            </div>
            <span className="stat-value">{stats.selected}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[var(--text-primary)]">Recent Activity</h2>
              <Link to="/student/applications" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivity.map((app) => (
                <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    app.status === 'Selected' ? 'bg-success-500' :
                    app.status === 'Shortlisted' ? 'bg-secondary-500' :
                    app.status === 'Rejected' ? 'bg-error-500' :
                    app.status === 'Under Review' ? 'bg-warning-500' : 'bg-primary-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{app.internshipTitle}</p>
                    <p className="text-xs text-[var(--text-muted)]">{app.companyName} - {app.appliedDate}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    app.status === 'Selected' ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400' :
                    app.status === 'Shortlisted' ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-400' :
                    app.status === 'Rejected' ? 'bg-error-50 text-error-700 dark:bg-error-900/20 dark:text-error-400' :
                    app.status === 'Under Review' ? 'bg-warning-50 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400' :
                    'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[var(--text-primary)]">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <Link to="/internships" className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors">
                <Briefcase className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Browse Internships</p>
                  <p className="text-xs text-[var(--text-muted)]">Find new opportunities</p>
                </div>
              </Link>
              <Link to="/student/applications" className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors">
                <FileText className="w-5 h-5 text-secondary-600" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">My Applications</p>
                  <p className="text-xs text-[var(--text-muted)]">Track your progress</p>
                </div>
              </Link>
              <Link to="/student/saved" className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors">
                <Bookmark className="w-5 h-5 text-accent-600" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Saved Internships</p>
                  <p className="text-xs text-[var(--text-muted)]">{mySaved.length} saved</p>
                </div>
              </Link>
              <Link to="/student/profile" className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors">
                <Clock className="w-5 h-5 text-warning-600" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Update Profile</p>
                  <p className="text-xs text-[var(--text-muted)]">Keep your info current</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[var(--text-primary)]">Recommended for You</h2>
            <Link to="/internships" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} showActions={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
