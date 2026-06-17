export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company';
  avatar?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  college: string;
  degree: string;
  year: string;
  gpa: string;
  skills: string[];
  resume: string;
  bio: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  industry: string;
  size: string;
  website: string;
  description: string;
  location: string;
  logo: string;
  founded: string;
}

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  skills: string[];
  duration: string;
  stipend: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  deadline: string;
  postedDate: string;
  isActive: boolean;
  applications: number;
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Selected';
  resume: string;
}

export interface SavedInternship {
  id: string;
  studentId: string;
  internshipId: string;
  savedDate: string;
}

export interface Applicant {
  id: string;
  applicationId: string;
  name: string;
  college: string;
  degree: string;
  year: string;
  skills: string[];
  resume: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Selected';
  appliedDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}
