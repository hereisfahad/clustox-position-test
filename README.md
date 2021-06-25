# Clustox Position Test

This is the solution of clustox position test. It is a simple auth app with login and register.

## Overview

- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://leerob.io/dashboard), newsletter subscription, and post views.

## Running Locally

```bash
$ git clone https://github.com/hereisfahad/clustox-position-test.git
$ cd clustox-position-test
$ yarn # To install dependencies
$ yarn dev # For running project in development mode
$ yarn lint # For lint conformance
$ yarn build # For creating production build
$ yarn start # For running project in production mode
```

Create a `.env.local` file similar to [`.env.example`](https://github.com/hereisfahad/clustox-position-test/blob/master/.env.example).

```bash
# MongoDB uri
DATABASE_URL=
# token secret should be at least 32 characters long
TOKEN_SECRET=
# BASE URL
NEXT_PUBLIC_BASE_URL=
```

## Built Using

- [Next.js: Version 11](https://nextjs.org/)
- [Node/Express using Nextjs API Routes](https://nextjs.org/)
- [MongoDB/Mongoose](https://mongoosejs.com/)
- [Chakra UI](https://chakra-ui.com/)
- [GraphQL](https://www.graphql.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [React Hook Forms](https://react-hook-form.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Google Conformance](https://web.dev/conformance)
- [Vercel](https://vercel.com)

## Live link
[Visit the link](https://clustox-position-test.vercel.app)

