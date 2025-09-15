// import { createClient } from 'redis';

// const redisClient = createClient({
//     url: process.env.REDIS_URL,
// });

// redisClient.on('error', (err) => console.error('Redis Client Error:', err));
// redisClient.on('connect', () => console.log('Connected to Redis'));
// redisClient.on('ready', () => console.log('Redis Client Ready'));

// // Connect to Redis
// async function connectRedis() {
//     try {
//         await redisClient.connect();
//     } catch (error) {
//         console.error('Failed to connect to Redis:', error);
//     }
// }

// connectRedis();

// export default redisClient;


import { createClient } from "redis";
import { URL } from "url";

const redisUrl = process.env.REDIS_URL!;
const isTls = redisUrl.startsWith("rediss://");


const { hostname, port } = new URL(redisUrl);

const redisClient = createClient({
  url: redisUrl,
  socket: isTls
    ? {
        host: hostname,
        port: Number(port),
        tls: true,
        rejectUnauthorized: false,
      }
    : undefined,
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("ready", () => console.log("Redis Client Ready"));

async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
}

connectRedis();

export default redisClient;
