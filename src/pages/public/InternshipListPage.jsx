import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, MapPin, Clock, DollarSign, Building2 } from 'lucide-react';
import { internships, savedInternships } from '../../data/dummyData';
import { InternshipCard } from '../../components/common/InternshipCard';
import { SearchBar } from '../../components/common/SearchBar';
import { useAuth } from '../../hooks/useAuth';

export function InternshipListPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    duration: '',
  });
  const [saved, setSaved] = useState(() =>
    user ? savedInternships.filter(s => s.studentId === user.id).map(s => s.internshipId) : []
  );

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const matchesSearch =
        search === '' ||
        internship.title.toLowerCase().includes(search.toLowerCase()) ||
        internship.companyName.toLowerCase().includes(search.toLowerCase()) ||
        internship.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesType = !filters.type || internship.type === filters.type;
      const matchesLocation = !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesDuration = !filters.duration || internship.duration.includes(filters.duration);
      return matchesSearch && matchesType && matchesLocation && matchesDuration;
    });
  }, [search, filters]);

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">Browse Internships</h1>
          <p className="section-subtitle">Find the perfect internship opportunity for your career</p>
        </div>

        <div className="flex gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by title, company, or skills..."
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-outline px-4 py-3 ${showFilters ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:border-primary-700' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="card p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[var(--text-primary)]">Filters</h3>
              <button
                onClick={() => setFilters({ type: '', location: '', duration: '' })}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="input-field"
                >
                  <option value="">All Types</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="City or state"
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={filters.duration}
                    onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                    placeholder="e.g., 3 months"
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              isSaved={saved.includes(internship.id)}
              onToggleSave={() => toggleSave(internship.id)}
              showActions={!!user}
            />
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No internships found</h3>
            <p className="text-sm text-[var(--text-muted)]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
