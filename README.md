# Healthcare Management System

A comprehensive healthcare management system designed for charity clinics, built with React, Material-UI, and Supabase.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication**: Secure login with Admin, Doctor, and Patient roles
- **Patient Management**: Complete patient records with medical history and demographics
- **Visit Logging**: Comprehensive visit documentation for dental and general healthcare
- **Appointment Scheduling**: Full calendar integration for therapy and consultation scheduling
- **Medical Records**: Secure document management with file upload capabilities
- **Analytics Dashboard**: Real-time clinic statistics and performance metrics

### User Roles & Permissions

#### Admin Users
- Full system access and user management
- Clinic statistics and analytics dashboard
- Patient and doctor data oversight
- System configuration and settings

#### Doctor Users
- Patient visit logging and documentation
- Medical record access and updates
- Appointment management
- Treatment planning and follow-up scheduling

#### Patient Users
- Personal medical history access
- Appointment viewing and management
- Therapy schedule tracking
- Secure communication with healthcare providers

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with RLS
- **State Management**: React Context + Hooks
- **Build Tool**: Vite
- **Styling**: Material-UI Components + Custom Theme

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Setup Instructions

### 1. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 2. Database Setup

1. **Connect to Supabase**: Click the "Connect to Supabase" button in the top right
2. **Run Migrations**: The database schema will be automatically created
3. **Demo Data**: Sample data is included for testing (optional)

### 3. Install Dependencies

```bash
npm install
```

### 4. Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 👥 Demo Accounts

For testing purposes, create these accounts in Supabase Auth:

- **Admin**: admin@clinic.com / admin123
- **Doctor**: doctor@clinic.com / doctor123  
- **Patient**: patient@clinic.com / patient123

## 📊 Database Schema

### Core Tables
- `users` - User profiles and role management
- `patients` - Patient demographics and medical information
- `visits` - Visit records with diagnoses and treatments
- `treatments` - Detailed treatment information and medications
- `medical_records` - Document storage and file management
- `appointments` - Scheduling and calendar management

### Security Features
- Row Level Security (RLS) enabled on all tables
- Role-based access control policies
- Encrypted data storage with Supabase
- Audit trails with created/updated timestamps

## 🔒 HIPAA Compliance Considerations

### Data Security
- All patient data encrypted at rest and in transit
- Role-based access controls with principle of least privilege
- Secure authentication with Supabase Auth
- Regular security audits and access logging

### Privacy Protection
- Patient data access restricted by role
- Audit trails for all data access and modifications
- Secure file upload and storage for medical documents
- Data retention policies and backup procedures

### Compliance Checklist
- [ ] Business Associate Agreement (BAA) with Supabase
- [ ] Staff HIPAA training and access controls
- [ ] Incident response and breach notification procedures
- [ ] Regular security risk assessments
- [ ] Physical safeguards for clinic devices

## 🚀 Production Deployment

### Recommended Deployment Stack
1. **Frontend**: Netlify or Vercel for static hosting
2. **Database**: Supabase Pro for production workloads
3. **CDN**: Cloudflare for global content delivery
4. **Monitoring**: Sentry for error tracking and performance

### Environment Variables (Production)
```env
VITE_APP_ENV=production
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### Build Command
```bash
npm run build
```

## 📱 Mobile Optimization

The application is fully responsive and optimized for:
- **Tablets** (iPad, Android tablets) - Primary clinic use case
- **Mobile phones** - Emergency access and patient portal
- **Desktop** - Administrative tasks and detailed documentation

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard widgets and charts
│   ├── Layout/         # Layout components (Sidebar, AppLayout)
│   ├── Patients/       # Patient management components
│   └── Visits/         # Visit logging components
├── context/            # React Context providers
├── lib/                # Utility libraries and configurations
├── pages/              # Main page components
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🆘 Alternative Solutions

### Open Source Healthcare Systems
If you need more comprehensive features, consider these established solutions:

1. **OpenMRS** - Complete medical record system
   - Pros: Mature, feature-rich, international support
   - Cons: Complex setup, requires significant customization

2. **GNU Health** - Hospital management system
   - Pros: Comprehensive, includes pharmacy and lab modules
   - Cons: Python-based, requires medical knowledge for setup

3. **OpenEMR** - Electronic medical records
   - Pros: HIPAA compliant, extensive features
   - Cons: PHP-based, traditional architecture

### Recommended Tech Stack Alternatives

For larger implementations:
- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: Next.js + Chakra UI or React + Ant Design
- **Database**: PostgreSQL with TimescaleDB for analytics
- **Authentication**: Auth0 or AWS Cognito
- **File Storage**: AWS S3 with encryption
- **Deployment**: AWS or Google Cloud with container orchestration

## 📞 Support

For production deployment and HIPAA compliance assistance, consider consulting with:
- Healthcare IT specialists
- HIPAA compliance attorneys
- Cloud security experts
- Medical informatics professionals

## ⚠️ Important Disclaimers

1. **Medical Compliance**: This system requires proper HIPAA compliance setup for production use
2. **Security Audit**: Conduct thorough security audits before handling real patient data
3. **Legal Review**: Consult healthcare attorneys for regulatory compliance
4. **Backup Strategy**: Implement robust backup and disaster recovery procedures
5. **Staff Training**: Ensure all users receive proper training on system use and data handling

---

Built with ❤️ for charity clinics and healthcare accessibility