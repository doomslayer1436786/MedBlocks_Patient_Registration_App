# Patient Registration App

Live Demo Link
https://med-blocks-patient-regis-git-c7eccd-doomslayer1436786s-projects.vercel.app/


A Next.js application for patient registration with local database storage using PGlite.

## Features
- Patient registration with form validation
- Local database storage using PGlite
- SQL query interface for data exploration
- Cross-tab synchronization
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technical Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- PGlite for local database
- React Query
- React Hook Form with Zod validation

## Challenges and Solutions

### Deployment Challenges
One significant challenge faced during deployment was related to Vercel's region configuration. Initially, the application was configured to deploy to all regions (`"regions": ["all"]` in vercel.json), which is a feature restricted to Pro and Enterprise plans. This was resolved by:

1. Identifying the limitation in the free tier
2. Modifying the deployment configuration to use a single region (US East - iad1)
3. Updating vercel.json to optimize for the target audience
4. Successfully deploying to a single region while maintaining good performance

This experience highlighted the importance of understanding platform limitations and making appropriate adjustments to deployment configurations.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ElectricSQL](https://electric-sql.com/) for PGlite
- [Vercel](https://vercel.com) for Next.js
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Headless UI](https://headlessui.com/) for accessible components
