import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createClient } from "redis";

const app = express();
const PORT: number = 3000;
const REDIS_URL: string = 'redis://localhost:6379';

const redisClient = createClient({ url: REDIS_URL });
redisClient.connect();

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

interface EventMessage {
    userId: string;
    eventType: string;
    timestamp?: string;
}

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');
    ws.on('message', async (message: string) => {
      try {
        const event: EventMessage = JSON.parse(message);
        
        if (!event.userId || !event.eventType) {
          console.error('Invalid event format:', event);
          ws.send(JSON.stringify({ error: 'Invalid event format: userId and eventType are required' }));
          return;
        }
        
        event.timestamp = new Date().toISOString();
  
        const userKey = `events:${event.userId}`;
        await redisClient.lPush(userKey, JSON.stringify(event));
        await redisClient.lTrim(userKey, 0, 9);
  
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event));
          }
        });
      } catch (error) {
        console.error('Error processing message:', error);
        ws.send(JSON.stringify({ error: 'Error processing message' }));
      }
    });
});

app.get('/events/recent', async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const userKey = `events:${userId}`;
    const events = await redisClient.lRange(userKey, 0, 9);
    res.json(events.map((e) => JSON.parse(e)));
});