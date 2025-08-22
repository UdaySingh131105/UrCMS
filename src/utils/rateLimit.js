import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client from environment variables
const redis = Redis.fromEnv();

// Create rate limiter
export const rateLimit = new Ratelimit({
  redis,
  // Define limiter: allow 5 requests per 10 seconds
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  prefix: "ratelimit", // optional, used to namespace keys
});

export const config = {
    runtime: 'Edge'
}