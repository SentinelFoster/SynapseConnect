import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Posts API endpoints
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/posts", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user;
      const { content, imageUrl, gptName } = req.body;

      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }

      const post = storage.createPost({
        userId: user.id,
        content,
        imageUrl,
        gptName,
      });

      res.status(201).json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // GPT slots API endpoints
  app.get("/api/gpt-slots", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user;
      const slots = storage.getGptSlotsByUserId(user.id);
      res.json(slots);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
