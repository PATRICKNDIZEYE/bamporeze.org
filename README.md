# hcakigali monorepo

This is a full stack monorepo for hcakigali project built using `nextjs`, `nestjs`, `tailwindcss` and `typescript`and `turborepo`

### How to run

1. Clone this repo

```bash
$ git clone https://github.com/scriptylabsdotrw/hcakigali.git
```

2. Run `yarn` to install dependencies

```bash
$ yarn
```
3. Setup environment variables in `apps/api/.env`
Use this template below to setup your environment variables

```bash
# .env
PORT=5000

DATABASE_URL="mongodb+srv://username:passwork@host/my-db?retryWrites=true&w=majority"

REFRESH_TOKEN_SECRET="refresh-token-secret"
ACCESS_TOKEN_SECRET="access-token-secret"

CLOUDINARY_CLOUD_NAME="cloudiname"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"

SMTP_SERVER="smtp-server"
SMTP_USERNAME="smtp-username-credential"
SMTP_PASSWORD="smtp-password-credential"
```

```bash
3. Install `turbo` globally

```bash
$ yarn global add turbo-cli
```

4. Push database schema

```bash
 yarn workspace api prisma db push
 ```

5. Start the development server

```bash
$ turbo dev
```

This runs all packages in parallel

### Packages

- `api` : Nestjs API
- `web` : Nextjs web app
- `panel`: Nextjs admin panel
- subpackages:
  - `@repo/config-eslint`: shared workspace eslint config
  - `@repo/config-typescript`: shared workspace typescript config
  - `@repo/tailwind-config`: shared workspace tailwind config
  - `@repo/ui`: shared workspace UI components

### Why turbo ?

I mainly used it because I wanted to have a single ui library for stuff but I has a lot of benefits

---

Jan 2024
