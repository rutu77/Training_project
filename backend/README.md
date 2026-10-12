# Backend operations

## Build and start

The backend requires Node.js 18 or newer. For local development, run `npm start` to use Node's watch mode with `ts-node`. For a compiled deployment, run `npm run build` and then `npm run start:prod`.

## Provisioning the first administrator

Public registration can create a regular account or submit a teacher-access request. It cannot create an administrator. To provision the first administrator, register the intended account normally, then use a trusted PostgreSQL administrative session to promote that account:

```sql
UPDATE public."User_table"
SET role = 'admin'
WHERE email = 'administrator@example.com';
```

Confirm that exactly one row was updated. Do not expose database credentials or run this operation from an application endpoint. Once an administrator exists, use the authenticated admin role-management workflow to grant or revoke roles.

The `ADMIN_SECRET_KEY` setting is no longer used and should be removed from local deployment environment files.

## Public endpoint rate limits

Login attempts are limited to 10 requests per 15 minutes per client IP and registrations to 5 per hour. When deploying behind reverse proxies, set `TRUST_PROXY_HOPS` to the exact number of trusted proxy hops so Express derives client IPs correctly. Leave it at `0` when clients connect directly; do not trust arbitrary forwarded headers.

The default rate-limit store is process-local. Use a shared store before relying on these limits across multiple backend instances.

## Health and HTTP security

`GET /health` is a liveness endpoint. `GET /health/ready` checks the PostgreSQL connection and returns `503` if the database cannot be reached. The server begins listening only after PostgreSQL initializes and migrations complete. Configure orchestrators to use liveness and readiness for their distinct purposes. Helmet supplies baseline HTTP security headers; CSP is disabled for this JSON/file-serving API, and cross-origin resource policy permits the frontend to display uploaded assets. Keep HTTPS termination and trusted-proxy configuration managed by the deployment platform.

Local development allows both `http://localhost:4200` and `http://127.0.0.1:4200` by default. Set `CORS_ORIGINS` to the exact frontend origin list used by a deployment; origins are comma-separated and must include the hostname the browser uses.

## Release, backup, and recovery checks

Before a production release:

1. Set and verify `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `CORS_ORIGINS`, `PUBLIC_API_URL`, and `TRUST_PROXY_HOPS` in the deployment secret/configuration store. Never commit production secrets.
2. Run the backend tests and build, then build the frontend with its production configuration. Deploy the exact tested artifacts.
3. Take a PostgreSQL backup before a release that includes database migrations. Confirm the deployed service reports healthy liveness and ready database status, and smoke-test login, course listing, and enrollment.
4. Keep scheduled, encrypted PostgreSQL backups outside the database host/account. Define retention and recovery-point objectives with the deployment owner; periodically restore a backup into a separate non-production database and verify the application can read it.
5. For recovery, provision an isolated PostgreSQL database, restore the selected backup there, validate migrations and essential records, then switch application configuration only after the restore is verified. Preserve the original database until recovery is accepted.

The repository does not configure a hosting provider, backup scheduler, alerting service, or release approval process. Those must be provisioned and tested in the chosen deployment environment.

## Course catalog

`GET /course` returns only published courses that are not deleted. It supports `page` (default `1`), `limit` (default `20`, maximum `50`), and `search` (up to 100 characters, matching title and description). The response contains `data` and `pagination` with the requested page, limit, total matching courses, and total pages.

## Quiz and progress responses

Quiz responses include only course/creator summaries. Correct answers and explanations are returned only to administrators and the teacher who owns the quiz's course; learner responses omit those fields. Progress endpoints return user and quiz summaries instead of full related database entities.
