# write a simple dockerfile for playwright
FROM node:22-bookworm-slim AS base

FROM base AS deps

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN rm -rf .env

RUN yarn playwright install --with-deps

RUN touch results.json

FROM runner AS test

CMD ["yarn", "test:playwright:ci"]
