# Waitlist – NestJS + Apollo GraphQL (ADM Digital Inc, Backend(Nestjs) Engineer)

Small NestJS module for a waitlist feature using Apollo GraphQL: in-memory storage, email validation, and proper GraphQL errors.

## Setup

```bash
npm install
npm run build
```

## Run

```bash
npm run start:dev
```

- API: http://localhost:3000  
- GraphQL Playground: http://localhost:3000/graphql  

## Schema

- **Mutation:** `addToWaitlist(email: String!)` – add an email to the waitlist.
- **Query:** `getWaitlistStatus(email: String!)` – check if an email is on the waitlist.

Both return a `WaitlistStatus` object: `{ email, onWaitlist, message }`.

## Validation & errors

- Email is validated with a regex before processing.
- **Invalid email** → GraphQL error with `extensions.code: "VALIDATION_ERROR"`.
- **Already registered** → GraphQL error with `extensions.code: "ALREADY_REGISTERED"`.

## Example (GraphQL Playground)

**Add to waitlist:**

```graphql
mutation {
  addToWaitlist(email: "user@example.com") {
    email
    onWaitlist
    message
  }
}
```

**Get status:**

```graphql
query {
  getWaitlistStatus(email: "user@example.com") {
    email
    onWaitlist
    message
  }
}
```

## Structure

- `src/waitlist/` – Waitlist module  
  - `dto/` – Input/object types and validation  
  - `waitlist.service.ts` – In-memory storage and business logic  
  - `waitlist.resolver.ts` – GraphQL mutation and query  
  - `waitlist.module.ts` – Module definition  

No database; waitlist is stored in memory (reset on restart).
