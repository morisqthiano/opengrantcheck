# OpenGrantCheck

OpenGrantCheck is a local-first open-source AI assistant for research proposal compliance checking.

The project helps lecturers, researchers, small universities, and LPPM/research administration teams review proposal drafts against grant guidelines through a privacy-aware, self-hosted workflow. Many proposals fail because required sections, outputs, budget explanations, references, or administrative details are incomplete, not because the research idea is weak.

## Project Goal

OpenGrantCheck will provide a self-hosted web application where users can upload a grant guideline and a proposal draft, then receive a structured compliance checklist, missing-section detection, and practical revision suggestions.

Prototype V0.1 focuses on the foundation: document uploads, proposal tracking, and dummy compliance checklist results without real AI, RAG, API keys, or external services.

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

## Future Features

- Document parsing for proposal structure and sections.
- RAG-based guideline reader.
- Compliance checklist generator backed by real guideline retrieval.
- Missing-section detection.
- Revision recommendation module.
- Demo dataset and proposal templates.
- Docker-based self-hosted installation.

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

## Docker Setup

```bash
docker compose up --build
```

Default URLs:

```text
Backend: http://localhost:8000
Frontend: http://localhost:5173
```

## API Documentation

See [docs/api.md](docs/api.md).

## Roadmap

- M1: System architecture and database design
- M2: Guideline and document upload module
- M3: Document parser and RAG engine
- M4: Compliance checklist and recommendation module
- M5: Dashboard, testing, and security improvement
- M6: Documentation, Docker setup, and open-source release

## Project Status

Prototype V0.1. Compliance output is dummy data and exists only to validate the product workflow before adding real AI/RAG capabilities.

## License

Released under the GNU Affero General Public License v3.0 (AGPL-3.0).
