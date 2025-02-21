WebSocket Event Logger 📡📜
A real-time event logging system using WebSockets, Node.js, and Redis. This application tracks user activity events and provides real-time updates to subscribed clients.

Features
✅ WebSocket server for receiving and broadcasting user events
✅ Stores events in Redis for short-term storage
✅ REST API to fetch recent user events
✅ Real-time event updates to connected clients

Tech Stack
Backend: Node.js, TypeScript, WebSockets (ws library)
Database: Redis (for in-memory storage)
Deployment: Local execution with Docker or manual Redis setup
Getting Started 🚀
Prerequisites
Ensure you have the following installed:

Node.js (v16+ recommended)
npm (comes with Node.js)
Redis (either installed locally or running via Docker)
Installation
Clone the repository and install dependencies:

sh
Copy
Edit
git clone https://github.com/your-username/websocket-event-logger.git
cd websocket-event-logger
npm install
Environment Variables
Create a .env file in the root directory and add:

ini
Copy
Edit
PORT=3000
REDIS_URL=redis://localhost:6379
Running Redis
Option 1: Using Docker (Recommended)
If you have Docker installed, run:

sh
Copy
Edit
docker run -d --name redis-server -p 6379:6379 redis
Option 2: Running Redis Locally
If Redis is installed, start it with:

sh
Copy
Edit
redis-server
Running the Server
Start the WebSocket and REST API server:

sh
Copy
Edit
npm start
Server will be running on http://localhost:3000.

Usage
1️⃣ WebSocket Connection
Connect a WebSocket client to:

arduino
Copy
Edit
ws://localhost:3000
Send a message in JSON format:

json
Copy
Edit
{
  "userId": "12345",
  "eventType": "file_open"
}
2️⃣ Fetch Recent Events
Retrieve the last 10 events for a user via REST API:

bash
Copy
Edit
GET /events/recent?userId=12345
Testing 🛠️
Use Postman, cURL, or a WebSocket client (like wscat) for testing.

To test WebSockets:

sh
Copy
Edit
npm install -g wscat
wscat -c ws://localhost:3000
Then send:

json
Copy
Edit
{"userId": "12345", "eventType": "login"}
To test the API:

sh
Copy
Edit
curl "http://localhost:3000/events/recent?userId=12345"
