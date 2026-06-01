FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build:cli

FROM node:20-alpine AS runtime
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production
COPY --from=build /app /app
# the CLI is the entrypoint; default workdir for user data is /data
WORKDIR /data
ENTRYPOINT ["node", "/app/dist/cli/index.js"]
CMD ["--help"]
