# DCC One Shot

## Local development

Run Next.js directly on your workstation for fast refresh and use Docker only for the local PostgreSQL database.

### First-time setup

Requirements:

- Node.js 22
- Corepack
- Docker with the Compose plugin

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm db:local:up
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Generate a unique `BETTER_AUTH_SECRET` in `.env.local` before enabling auth:

```bash
openssl rand -base64 32
```

Docker Compose deployments read `.env` instead. Create it from the same template,
then replace the example credentials, auth secret, host, and public HTTPS auth URL:

```bash
cp .env.example .env
```

### Database

```bash
# Start PostgreSQL and wait until it is healthy
pnpm db:local:up

# Follow PostgreSQL logs
pnpm db:local:logs

# Generate a migration after changing db/schema
pnpm db:generate

# Apply committed migrations using the local environment
node --env-file=.env.local --import tsx db/migrate.ts

# Stop PostgreSQL without deleting its data
pnpm db:local:down
```

The local database persists in the `postgres_data_local` Docker volume.

### Checks before pushing

```bash
# ESLint, TypeScript, and a production Next.js build
pnpm verify

# Optional: verify the production Docker image
pnpm docker:check
```

Use `pnpm docker:check` when application dependencies or Docker-related files change. Jenkins repeats the required CI checks and deploys merged changes from `develop` and `main` to the homeserver.
