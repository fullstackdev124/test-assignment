# test-assignment

Repository for test and sample projects. Each project lives in its own directory.

## Projects

| Project | Stack | Description |
|---------|--------|-------------|
| [waitlist-nestjs](./waitlist-nestjs) | NestJS, Apollo GraphQL | Waitlist module with in-memory storage, email validation, and GraphQL API (add/check waitlist status). |
| [calendar-service](./calendar-service) | Laravel, PHP, Vue | Returns free booking times for a Relocity-style calendar: host 8am–8pm, busy intervals from calendar service, timezone-aware (booker in America/New_York). |
| [lightfeather](./lightfeather) | Docker, Next.js | Full-stack demo; run via Docker Compose. Next.js frontend in `Frontend/`. App at http://localhost:3000. |
| [data-visualization-graph](./data-visualization-graph) | Next.js, React, FusionCharts | Next.js app with data visualization (FusionCharts, xlsx export). |
| [PixCap](./PixCap) | TypeScript, Node | TypeScript app; build with `tsc` and run with `node app` (or use `run.bat`). |
| [CarIQ](./CarIQ) | Docker | Wallet/ticket/fare API: create wallet, deposit, get fare, buy ticket. Run with `docker compose up`; API at http://localhost:8080. |
| [Pismo](./Pismo) | Docker | Accounts and transactions API: create account, create transaction, list transactions. Run with `docker compose up`; API at http://localhost:8080. |

## Running a project

Each project has its own setup. Go into the project folder and follow its README.

| Project | Quick start |
|---------|-------------|
| waitlist-nestjs | `npm install` → `npm run start:dev` (GraphQL at :3000/graphql) |
| calendar-service | Laravel + Mix: `composer install`, `npm install`, then `php artisan` / `npm run dev` as in project README |
| lightfeather | `docker compose --env-file .env up` (then http://localhost:3000) |
| data-visualization-graph | `npm install` → `npm run dev` |
| PixCap | `tsc app.ts` then `node app`, or `run.bat` (from project root) |
| CarIQ | `docker compose up` |
| Pismo | `docker compose up` |
