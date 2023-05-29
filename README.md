# miga interview pairing

Next.js app based on [trpc/examples-next-prisma-starter](http://github.com/trpc/examples-next-prisma-starter) used during the Miga hiring process.

## Prerequisites

- Install Docker: https://www.docker.com/products/docker-desktop/
- Install Node.js: https://nodejs.org/
    - Enable `corepack` by running `corepack enable`

## Getting started

```
yarn install
yarn start
```

> **Note**
> Change the default `DB_PORT` and `APP_PORT` in `.env` if the defaults are already in use

Then browse to <http://localhost:4000>. (or the port set in `APP_PORT`)

## Running tests

```
yarn test
```

## Creating a database migration

1. Edit `prisma/schema.prisma`
2. Run `migrate:dev`
