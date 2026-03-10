# quzex

`quzex` is a Next.js portfolio and agency website for website development services. It includes a public marketing site, service detail pages, a work/portfolio section, contact enquiries, and a static admin dashboard that is gradually being connected to MongoDB-backed data.

## Main Pages

- `/` home page
- `/about`
- `/services`
- `/services/[slug]`
- `/work`
- `/contact`
- `/login`
- `/dashboard`

## Admin Dashboard Pages

- `/dashboard`
- `/dashboard/inquiries`
- `/dashboard/portfolio`
- `/dashboard/portfolio/new`
- `/dashboard/client-logos`
- `/dashboard/services`
- `/dashboard/settings`

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- React Query
- Mongoose
- Vercel Blob
- Sonner
- Lucide React

## Features

- reusable hero sections
- dynamic service detail pages
- MongoDB-backed contact enquiry flow
- MongoDB-backed portfolio API
- MongoDB-backed client logo API
- admin portfolio upload flow
- admin client logo upload flow
- portfolio category filters
- WhatsApp floating button
- sitemap and robots support

## Environment Variables

Create a `.env` file with the required values:

```env
MONGODB_URI=your_mongodb_connection_string
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
NEXT_PUBLIC_SITE_URL=https://quzex.co
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/
    (pages)/
    api/
  components/
    About/
    Auth/
    Contact/
    Dashboard/
    Global/
    Home/
    Services/
    Work/
    common/
    ui/
  lib/
  models/
  types/
```

## API Overview

### User APIs

- `POST /api/users/contact`
- `GET /api/users/client-logos`
- `GET /api/users/portfolio`
- `GET /api/users/portfolio/:category`

### Admin APIs

- `GET /api/admin/inquiries`
- `PATCH /api/admin/inquiries/:id`
- `DELETE /api/admin/inquiries/:id`
- `POST /api/admin/client-logos`
- `GET /api/admin/client-logos`
- `PATCH /api/admin/client-logos/:id`
- `DELETE /api/admin/client-logos/:id`
- `POST /api/admin/portfolio`

### Upload API

- `POST /api/upload`

## Notes

- Public portfolio and client-logo sections are now driven from database APIs.
- The dashboard still contains some static UI actions that are not fully connected yet.
- Client-logo uploads are optimized before upload on the frontend.
