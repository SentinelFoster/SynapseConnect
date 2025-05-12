import { users, User, InsertUser, siSlots, posts, SiSlot, Post, InsertPost } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPostsByUserId(userId: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  
  getSiSlotsByUserId(userId: number): Promise<SiSlot[]>;
  
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private siSlots: Map<number, SiSlot>;
  sessionStore: session.SessionStore;
  
  currentUserId: number;
  currentPostId: number;
  currentSiSlotId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.siSlots = new Map();
    
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentSiSlotId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
    
    // Add some initial data (optional)
    this.initializeDummyData();
  }

  private initializeDummyData() {
    // Create a few users
    const user1: User = {
      id: this.currentUserId++,
      username: "sarah_connor",
      password: "hashed_password_here",
      tier: "free",
      siApiCode: "SI-AXF92kJd7Hst",
      avatar: null,
      banner: null,
      bio: null
    };
    
    const user2: User = {
      id: this.currentUserId++,
      username: "james_wilson",
      password: "hashed_password_here",
      tier: "tier2",
      siApiCode: "SI-BYH45lKp8Qwz",
      avatar: null,
      banner: null,
      bio: null
    };
    
    const user3: User = {
      id: this.currentUserId++,
      username: "emily_davis",
      password: "hashed_password_here",
      tier: "free",
      siApiCode: "SI-CZT67mNs9Rxy",
      avatar: null,
      banner: null,
      bio: null
    };
    
    this.users.set(user1.id, user1);
    this.users.set(user2.id, user2);
    this.users.set(user3.id, user3);
    
    // Create some posts
    const post1: Post = {
      id: this.currentPostId++,
      userId: user1.id,
      content: "Just finished analyzing the latest market trends with my Analytics SI. Fascinating insights on how AI is transforming business intelligence! Here's a visualization it created showing the projected growth in key sectors.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
      createdAt: new Date().toISOString(),
      siName: "AnalyticsSI",
      username: user1.username,
    };
    
    const post2: Post = {
      id: this.currentPostId++,
      userId: user2.id,
      content: "I asked my CreativeSI to imagine what transportation might look like in 2075. Check out this amazing concept it came up with - a magnetic levitation pod system powered by renewable energy that connects major cities!",
      imageUrl: "https://pixabay.com/get/g13a9bf8548a5f01a68de17828d7ade2bf535ed374a529a2f2f7eb7bc35277d1f0f05424685f24d0d81968d956cba775e242f7be523c97cd6351eb2ce6c73604f_1280.jpg",
      createdAt: new Date().toISOString(),
      siName: "CreativeSI",
      username: user2.username,
    };
    
    const post3: Post = {
      id: this.currentPostId++,
      userId: user3.id,
      content: "Just upgraded to Tier 2 and I'm amazed at how much better my RecipeSI's suggestions are! It learned my dietary preferences and created this custom meal plan. Worth every penny!",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      username: user3.username,
    };
    
    this.posts.set(post1.id, post1);
    this.posts.set(post2.id, post2);
    this.posts.set(post3.id, post3);
    
    // Create some SI slots
    const slot1: SiSlot = {
      id: this.currentSiSlotId++,
      userId: user1.id,
      name: "AnalyticsSI",
      type: "analytics",
      active: true,
      settings: null,
      paymentTracking: false,
      linkedApiCode: user1.siApiCode,
    };
    
    const slot2: SiSlot = {
      id: this.currentSiSlotId++,
      userId: user2.id,
      name: "CreativeSI",
      type: "creative",
      active: true,
      settings: null,
      paymentTracking: true, // Tier 2 user has payment tracking enabled
      linkedApiCode: user2.siApiCode,
    };
    
    const slot3: SiSlot = {
      id: this.currentSiSlotId++,
      userId: user3.id,
      name: "RecipeSI",
      type: "recipe",
      active: true,
      settings: null,
      paymentTracking: false,
      linkedApiCode: user3.siApiCode,
    };
    
    this.siSlots.set(slot1.id, slot1);
    this.siSlots.set(slot2.id, slot2);
    this.siSlots.set(slot3.id, slot3);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    // Generate unique SI API code (combination of random string and user ID for uniqueness)
    const siApiCode = `SI-${Buffer.from(Math.random().toString(36).substring(2, 10) + id).toString('base64').substring(0, 12)}`;
    
    const user: User = { 
      ...insertUser, 
      id,
      tier: "free", // Default tier for new users
      siApiCode, // Set the unique API code
      avatar: null,
      banner: null,
      bio: null
    };
    this.users.set(id, user);
    return user;
  }
  
  async getPosts(): Promise<Post[]> {
    // Sort posts by createdAt in descending order (newest first)
    return Array.from(this.posts.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }
  
  async getPostsByUserId(userId: number): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  createPost(insertPost: InsertPost): Post {
    const id = this.currentPostId++;
    const post: Post = {
      ...insertPost,
      id,
      createdAt: new Date().toISOString(),
      username: Array.from(this.users.values()).find(user => user.id === insertPost.userId)?.username || "Unknown",
    };
    this.posts.set(id, post);
    return post;
  }
  
  async getSiSlotsByUserId(userId: number): Promise<SiSlot[]> {
    return Array.from(this.siSlots.values())
      .filter(slot => slot.userId === userId);
  }
}

export const storage = new MemStorage();
