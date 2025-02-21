# WebSocket Event Logger

A real-time event logging system using WebSockets, Node.js, and Redis.

## Features

- WebSocket server to receive user activity events
- Stores events in Redis for short-term storage
- API endpoint to retrieve the last 10 events for a user
- Real-time event broadcasting to connected clients

## Tech Stack

- **Backend:** Node.js, WebSockets (ws)
- **Database:** Redis (for in-memory storage)
- **Deployment:** Local execution with a simple script

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/m7chin/Devek.git
cd Devek
npm install
```

## Running the Server

Start the Redis server (if not already running):

```sh
docker run --name redis-server -p 6379:6379 -d redis
```

Then, start the backend server:

```sh
npm start
```

## WebSocket Usage

Clients can connect to the WebSocket server at:

```
ws://localhost:3000
```

### Example WebSocket Event

A client should send JSON messages like:

```json
{
  "userId": "123",
  "eventType": "login"
}
```

The server will respond with:

```json
{
  "userId": "123",
  "eventType": "login",
  "timestamp": "2025-02-21T12:00:00.000Z"
}
```

## API Endpoints

### Retrieve Recent Events

- **URL:** `GET /events/recent`
- **Query Params:** `userId` (required)
- **Response:** Last 10 events for the given user.

#### Example Request:

```sh
curl "http://localhost:3000/events/recent?userId=123"
```

#### Example Response:

```json
[
  {
    "userId": "123",
    "eventType": "login",
    "timestamp": "2025-02-21T12:00:00.000Z"
  },
  {
    "userId": "123",
    "eventType": "file_open",
    "timestamp": "2025-02-21T12:05:00.000Z"
  }
]
```

## Testing

You can test the WebSocket server using a WebSocket client like:

```sh
wscat -c ws://localhost:3000
```

Then, send a message:

```sh
{"userId": "123", "eventType": "logout"}
```

## License

This project is licensed under the MIT License.
