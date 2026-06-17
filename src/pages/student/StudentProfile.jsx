import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, GraduationCap, MapPin, Phone, Mail, Globe, Github, Linkedin, FileText, Edit2, Check, X } from 'lucide-react';
import { studentProfiles } from '../../data/dummyData';
import { useAuth } from '../../hooks/useAuth';

export function StudentProfile() {
  const { user } = useAuth();
  const profile = studentProfiles.find((p) => p.userId === user?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  if (!profile || !user) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Profile not found</h2>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="section-title">My Profile</h1>
          <p className="section-subtitle">Manage your personal and academic information</p>
        </div>

        <div className="card overflow-hidden mb-6">
          <div className="h-32 bg-primary-600" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 mb-4">
              <div className="w-24 h-24 rounded-2xl bg-[var(--bg-surface)] border-4 border-[var(--bg-surface)] flex items-center justify-center">
                <User className="w-12 h-12 text-[var(--text-muted)]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{user.name}</h2>
                <p className="text-sm text-[var(--text-muted)]">{profile.degree} at {profile.college}</p>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} className="btn-primary text-sm">
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="btn-outline text-sm">
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn-outline text-sm">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Email</p>
                    <p className="text-sm text-[var(--text-primary)]">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Phone</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Location</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Portfolio</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.portfolio || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Academic Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">College</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.college}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Degree</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.degree}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Year</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-[var(--text-muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">GPA</p>
                    <p className="text-sm text-[var(--text-primary)]">{profile.gpa}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">About</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Social Links</h3>
              <div className="space-y-3">
                {profile.linkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-sm text-[var(--text-primary)]">{profile.linkedin}</span>
                  </div>
                )}
                {profile.github && (
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-sm text-[var(--text-primary)]">{profile.github}</span>
                  </div>
                )}
                {profile.portfolio && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-sm text-[var(--text-primary)]">{profile.portfolio}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">Resume</h3>
              <div className="flex items-center gap-3 p-3 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-elevated)]">
                <FileText className="w-8 h-8 text-primary-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{profile.resume}</p>
                  <p className="text-xs text-[var(--text-muted)]">PDF Document</p>
                </div>
              </div>
              <button className="btn-outline w-full mt-3 text-sm">
                <FileText className="w-4 h-4" />
                View Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
