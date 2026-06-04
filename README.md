# OpenGrantCheck

OpenGrantCheck is a local-first open-source AI assistant for research proposal compliance checking.

## Project Goal

OpenGrantCheck helps lecturers, researchers, small universities, and LPPM teams review research proposal drafts against grant guidelines through a privacy-aware, self-hosted workflow. Prototype V0.1 focuses on the foundation: document uploads, proposal tracking, and dummy compliance checklist results without real AI, RAG, API keys, or external services.

## Repository Structure

```text
opengrantcheck/
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── docs/
├── samples/
├── README.md
└── LICENSE
```

## Features V0.1

- Dashboard summary API and React dashboard.
- Upload grant guideline files: PDF, DOC, DOCX, TXT up to 10MB.
- Upload proposal draft files: PDF, DOC, DOCX, TXT up to 10MB.
- Run dummy compliance checks for proposals.
- View checklist status, score, and recommendations.
- No login, no AI integration, no API keys, and no external API calls.

## Technology Stack

- Backend: Laravel REST API
- Frontend: React.js + Vite
- Styling: Tailwind CSS
- API client: Axios
- Database: SQLite for local development, with migrations portable to MySQL

## Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

The backend runs by default at:

```text
http://localhost:8000
```

API routes are available under:

```text
http://localhost:8000/api
```

Uploaded files are stored in:

```text
backend/storage/app/public/guidelines
backend/storage/app/public/proposals
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs by default at:

```text
http://localhost:5173
```

## Project Status

Prototype V0.1. Compliance output is dummy data and exists only to validate the product workflow before adding real AI/RAG capabilities.

## Development Checks

Run backend tests:

```bash
cd backend
php artisan test
```

Run frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

## GitHub Push

```bash
git init
git add .
git commit -m "Initial OpenGrantCheck prototype"
git branch -M main
git remote add origin https://github.com/morisqthiano/opengrantcheck.git
git push -u origin main
```

## License

Released under the AGPL-3.0 License.
