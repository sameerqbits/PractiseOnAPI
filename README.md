# TypeScript CRUD

A simple TypeScript CRUD API using Express and SQLite.

## Setup

1. Install packages:

```bash
npm install
```

2. Build TypeScript:

```bash
npm run build
```

3. Run production server:

```bash
npm start
```

4. Or run in development mode:

```bash
npm run dev
```

## API Endpoints

- `GET /` - Health check
- `POST /employees` - Create employee
- `GET /employees` - List employees
- `GET /employees/:id` - Get employee
- `PUT /employees/:id` - Update employee salary
- `DELETE /employees/:id` - Delete employee

## Notes

- `employees.db` is ignored by Git and will be created automatically.
- Use Node 20+ for best compatibility with TypeScript 6.
