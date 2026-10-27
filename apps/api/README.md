# Gardeners CMS API

NestJS API for Gardeners content management. It provides authentication, users and roles, posts, projects, pages, media, categories, tags, menus, settings, audit logs and public content endpoints.

Run commands from the monorepo root unless noted otherwise.

```bash
Copy-Item apps/api/.env.example apps/api/.env
docker compose up -d postgres
pnpm --filter api exec prisma generate
pnpm --filter api exec prisma migrate dev
pnpm --filter api exec prisma db seed
pnpm dev:api
```

- API: `http://localhost:3001`
- Swagger: `http://localhost:3001/api/docs`

The root `README.md` contains the complete repository and deployment guide.
