ARG NODE_VERSION
ARG ALPINE_VERSION
ARG DOCKER_ENV


# Common env setup
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS env

## Take in env vars as build args
ARG PORT
ENV PORT $PORT

FROM env AS base

## Gets mounted to local
WORKDIR /app/dev

## Enable yarn
RUN corepack enable

## Copy yarn context
COPY .yarn/ .yarn/
COPY .yarnrc.yml .
COPY package.json .
COPY yarn.lock .

## Install dependencies
RUN yarn install

## Copy workspace
COPY .env .
COPY src/ src/
COPY prisma/ prisma/
COPY next.config.js .
COPY tsconfig.json .

# ## Generate prisma client
RUN yarn prisma generate


# Dev image
FROM base AS dev

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE $PORT
CMD ["yarn", "next", "dev"]
