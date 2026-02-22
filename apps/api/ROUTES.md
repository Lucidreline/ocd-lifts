# OCD API Routes

Base URL: `http://localhost:3000`

All authenticated routes require a `Authorization: Bearer <token>` header.

---

## Users `/users`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users` | No | Get all users with their sessions |
| GET | `/users/:id` | No | Get a single user by ID |
| POST | `/users` | No | Create a new user |
| POST | `/users/login` | No | Login and receive a JWT token |

### GET `/users`

Returns all users with their sessions included.

**Response:**
```json
[
  {
    "id": 1,
    "username": "manny",
    "sessions": [...]
  }
]
```

### GET `/users/:id`

Returns a single user by ID.

**Params:** `id` (integer)

**Response:**
```json
{
  "id": 1,
  "username": "manny"
}
```

### POST `/users`

Creates a new user. Username must be unique.

**Body:**
```json
{
  "username": "manny"
}
```

### POST `/users/login`

Returns a JWT token valid for 7 days.

**Body:**
```json
{
  "username": "manny"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## Sessions `/sessions`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/sessions` | Yes | Get all sessions for the authenticated user |
| POST | `/sessions` | Yes | Create a new session |
| GET | `/sessions/:sessionId/sets` | Yes | Get all sets in a session |
| POST | `/sessions/:sessionId/sets` | Yes | Create a new set in a session |

### GET `/sessions`

Returns all sessions for the authenticated user.

**Response:**
```json
[
  {
    "id": 1,
    "categories": ["push", "chest"],
    "userId": 1,
    "createdAt": "2026-02-22T00:00:00.000Z"
  }
]
```

### POST `/sessions`

Creates a new session for the authenticated user.

**Body:**
```json
{
  "categories": ["push", "chest"]
}
```

### GET `/sessions/:sessionId/sets`

Returns all sets for a session with exercise details, muscle groups, and PRs included.

**Params:** `sessionId` (integer)

**Response:**
```json
[
  {
    "id": 1,
    "sessionId": 1,
    "userId": 1,
    "exerciseId": 1,
    "intensity": 8.5,
    "notes": "felt good",
    "repCount": 10,
    "weightLbs": 135,
    "score": 1350,
    "createdAt": "2026-02-22T00:00:00.000Z",
    "updatedAt": "2026-02-22T00:00:00.000Z",
    "exercise": {
      "id": 1,
      "name": "Bench Press",
      "variation": "Flat",
      "repRange": "8-12",
      "userId": 1,
      "muscleGroups": [...],
      "PRs": [...]
    }
  }
]
```

### POST `/sessions/:sessionId/sets`

Creates a new set. Automatically checks if the set is a PR and creates a PR record if so.

Score is calculated as `repCount * weightLbs`, or just `repCount` if `weightLbs` is 0 (bodyweight).

**Params:** `sessionId` (integer)

**Body:**
```json
{
  "exerciseId": 1,
  "intensity": 8.5,
  "notes": "felt good",
  "repCount": 10,
  "weightLbs": 135
}
```

**Response:** The created set object with a `pr` field (the PR record if one was set, otherwise `{}`).

---

## Exercises `/exercises`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/exercises` | Yes | Get all exercises for the authenticated user |
| POST | `/exercises` | Yes | Create a new exercise with muscle groups |

### GET `/exercises`

Returns all exercises for the authenticated user with their muscle groups.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Bench Press",
    "variation": "Flat",
    "repRange": "8-12",
    "userId": 1,
    "muscleGroups": [
      {
        "id": 1,
        "priority": 1,
        "vagueName": "chest",
        "specificName": "upper chest",
        "exerciseId": 1
      }
    ]
  }
]
```

### POST `/exercises`

Creates a new exercise with its muscle groups.

**Body:**
```json
{
  "name": "Bench Press",
  "variation": "Flat",
  "repRange": "8-12",
  "muscleGroups": [
    {
      "priority": 1,
      "vagueName": "chest",
      "specificName": "upper chest"
    },
    {
      "priority": 2,
      "vagueName": "triceps",
      "specificName": null
    }
  ]
}
```

---

## TODO

- [ ] Update/delete routes for sessions, exercises, and sets
- [ ] Set routes (standalone, outside of sessions)
- [ ] Unit tests