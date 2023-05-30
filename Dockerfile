ARG NODE_VERSION
ARG ALPINE_VERSION


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

## Generate prisma client
COPY .env .
COPY prisma/ prisma/
RUN yarn prisma generate

## Copy workspace
COPY src/ src/
COPY next.config.js .
COPY tsconfig.json .


# Dev image
FROM base AS dev

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1
ENV DB_PORT 5432
EXPOSE $PORT
CMD ["yarn", "next", "dev"]
