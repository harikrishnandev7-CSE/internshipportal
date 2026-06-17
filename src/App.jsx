import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { InternshipListPage } from './pages/public/InternshipListPage';
import { InternshipDetailPage } from './pages/public/InternshipDetailPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { MyApplications } from './pages/student/MyApplications';
import { SavedInternships } from './pages/student/SavedInternships';
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { CompanyProfile } from './pages/company/CompanyProfile';
import { CreateInternship } from './pages/company/CreateInternship';
import { ManageInternships } from './pages/company/ManageInternships';
import { ApplicantsPage } from './pages/company/ApplicantsPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { RoleRoute } from './routes/RoleRoute';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();
  const showSidebar = user?.role === 'student' || user?.role === 'company';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-body)]">
      <Navbar />
      <div className="flex-1 flex">
        {showSidebar && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/internships" element={<InternshipListPage />} />
            <Route path="/internship/:id" element={<InternshipDetailPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/student/dashboard" element={<RoleRoute allowedRole="student"><StudentDashboard /></RoleRoute>} />
              <Route path="/student/profile" element={<RoleRoute allowedRole="student"><StudentProfile /></RoleRoute>} />
              <Route path="/student/applications" element={<RoleRoute allowedRole="student"><MyApplications /></RoleRoute>} />
              <Route path="/student/saved" element={<RoleRoute allowedRole="student"><SavedInternships /></RoleRoute>} />
              
              <Route path="/company/dashboard" element={<RoleRoute allowedRole="company"><CompanyDashboard /></RoleRoute>} />
              <Route path="/company/profile" element={<RoleRoute allowedRole="company"><CompanyProfile /></RoleRoute>} />
              <Route path="/company/internships/create" element={<RoleRoute allowedRole="company"><CreateInternship /></RoleRoute>} />
              <Route path="/company/internships" element={<RoleRoute allowedRole="company"><ManageInternships /></RoleRoute>} />
              <Route path="/company/applicants" element={<RoleRoute allowedRole="company"><ApplicantsPage /></RoleRoute>} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
