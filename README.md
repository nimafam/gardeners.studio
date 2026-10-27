# Gardeners

Gardeners is a Turborepo containing a Next.js website and a NestJS/Prisma CMS API. The repository includes the current Gardeners marketing site, journal, project archive, shared UI foundations, PostgreSQL schema, authentication, media, menus, pages, posts, projects and settings modules.

## Stack

- **Web:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion
- **API:** NestJS 11, Prisma 6, PostgreSQL, JWT authentication
- **Workspace:** pnpm 9 and Turborepo
- **Media:** local files in development; object storage is recommended for production

## Repository structure

```text
apps/
  web/     Next.js website (port 8080)
  api/     NestJS CMS API (port 3001)
packages/
  eslint-config/
  typescript-config/
```

Project media used by the website lives under `apps/web/public/work`. Large binary assets are tracked with Git LFS.

## Requirements

- Node.js 20 or newer
- pnpm 9
- Docker Desktop, or an existing PostgreSQL 16 instance
- Git LFS

## Local setup

```bash
git lfs install
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
docker compose up -d postgres
pnpm --filter api exec prisma generate
pnpm --filter api exec prisma migrate dev
pnpm --filter api exec prisma db seed
pnpm dev:all
```

Windows PowerShell equivalents for the copy commands:

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
```

Open:

- Website: `http://localhost:8080`
- API: `http://localhost:3001`
- Swagger: `http://localhost:3001/api/docs`

Change every example password and JWT secret before using the project outside local development.

## Commands

```bash
pnpm dev          # web only
pnpm dev:all      # web and API
pnpm build        # all workspace builds
pnpm lint         # all workspace linters
pnpm check-types  # TypeScript checks
```

## Environment

Docker reads the root `.env`. The API reads `apps/api/.env`. Both example files are committed; real environment files are ignored.

Required API values:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Owner seed values are optional after the first database initialization.

## Media and GitHub

The current project archive contains more than 1 GB of visual source material. Git LFS rules are included for images, videos, PDFs and design binaries. Contributors must install Git LFS before cloning or committing media.

For production and future multi-site use, move uploaded and portfolio media to S3-compatible storage such as Cloudflare R2 and store only URLs/metadata in PostgreSQL. This keeps deployments and repository history small.

## Deployment

The complete application needs a Node.js runtime and PostgreSQL. Recommended production topology:

1. Build and run `apps/web` as the public frontend.
2. Build and run `apps/api` as a private/API service.
3. Run PostgreSQL as a managed database or protected service.
4. Put both Node services behind HTTPS reverse proxying.
5. Use persistent object storage for uploads.

Standard PHP-only shared hosting is not sufficient. A VPS, container platform, or cPanel host with persistent Node.js applications and PostgreSQL is required.

## Before opening the repository

- Do not commit `.env` files, database dumps, runtime uploads or local logs.
- Confirm that Git LFS objects are uploaded with `git lfs push --all origin`.
- Run `pnpm lint`, `pnpm check-types`, and `pnpm build`.
