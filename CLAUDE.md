@AGENTS.md

# Project Rules

## Database
Never run `prisma migrate`, `prisma db push`, or `prisma db seed` yourself.
When a schema change or seed requires one of these commands, stop and tell the user which command to run and why.
