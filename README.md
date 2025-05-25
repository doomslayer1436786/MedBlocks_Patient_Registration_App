# Patient Registration App

A frontend-only patient registration application built with Next.js and PGlite. This application allows users to register new patients and manage their records using a browser-based SQL database.

## Features

- 🏥 Patient registration with form validation
- 📊 Raw SQL query interface for data exploration
- 💾 Data persistence using PGlite with IndexedDB storage
- 🔄 Cross-tab synchronization
- 📱 Responsive design with Tailwind CSS
- ✨ Modern UI with accessible components

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Database**: [PGlite](https://electric-sql.com/docs/usage/pglite) (Browser-based PostgreSQL)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Headless UI](https://headlessui.com/)

## Prerequisites

- Node.js 18.17 or later
- npm 9.6.7 or later

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd patient-registration-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Schema

The application uses a simple patient schema:

```sql
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT,
  address TEXT,
  medical_history TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### Patient Registration

1. Navigate to the "Register Patient" tab
2. Fill in the required patient information:
   - First Name
   - Last Name
   - Date of Birth
   - Gender
   - Contact Number
   - Email (optional)
   - Address (optional)
   - Medical History (optional)
3. Submit the form

### Query Records

1. Navigate to the "Query Records" tab
2. Enter your SQL query in the text area
3. Click "Execute Query" to see the results
4. Results will be displayed in a table format below the query interface

Example queries:
```sql
-- Get all patients
SELECT * FROM patients;

-- Find patients by name
SELECT * FROM patients WHERE first_name LIKE '%John%';

-- Get recent registrations
SELECT * FROM patients ORDER BY created_at DESC LIMIT 5;
```

## Data Persistence

The application uses PGlite with IndexedDB for data storage, which means:
- Data persists across page refreshes
- Data is synchronized across multiple tabs in the same browser
- Data is stored locally in the browser's IndexedDB storage

## Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── PatientForm.tsx
│   └── SQLQueryInterface.tsx
└── lib/               # Utilities
    ├── db.ts          # Database configuration
    └── validations.ts # Form validations
```

### Adding New Features

1. Create new components in the `components` directory
2. Add new database operations in `lib/db.ts`
3. Add new validations in `lib/validations.ts`
4. Update the UI in `app/page.tsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ElectricSQL](https://electric-sql.com/) for PGlite
- [Vercel](https://vercel.com) for Next.js
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Headless UI](https://headlessui.com/) for accessible components
