# write a simple dockerfile for playwright
FROM node:22-bookworm-slim AS base

FROM base AS deps

RUN yarn config set network-timeout 500000 -g

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

COPY package.json yarn.lock ./

RUN yarn playwright install --with-deps

COPY . .

RUN rm -rf .env

RUN touch results.json

FROM runner AS test

ENV CI=true

CMD ["yarn", "test:playwright:ci"]
