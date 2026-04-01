import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("portfolio.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    date TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    tags TEXT,
    image TEXT
  );
`);

// Ensure 'image' column exists in 'projects' table (for existing databases)
try {
  db.exec("ALTER TABLE projects ADD COLUMN image TEXT");
} catch (e) {
  // Column might already exist, ignore error
}

// Seed data if empty
// Seed data if empty or missing specific posts
const existingPosts = db.prepare("SELECT title FROM blog_posts").all() as { title: string }[];
const postTitles = existingPosts.map(p => p.title);

const insertPost = db.prepare("INSERT INTO blog_posts (title, excerpt, content, date, category) VALUES (?, ?, ?, ?, ?)");
const updatePost = db.prepare("UPDATE blog_posts SET excerpt = ?, content = ?, date = ?, category = ? WHERE title = ?");

const modelKitPost = {
  title: "My Journey into Model Kit Building",
  excerpt: "Exploring the intricate world of Gundam and scale models.",
  content: "Model kit building, or 'plamo', has been a cornerstone of my creative life from 2017 to present. It started with a simple HG Gundam, but it quickly evolved into a passion for precision and patience. There is something incredibly therapeutic about the process: carefully nipping parts from the runner, sanding down nub marks, and watching a hundred tiny pieces transform into a mechanical masterpiece. It's not just about the final product; it's about the discipline of the build. Each kit is a lesson in focus and a testament to the idea that great things are built one small piece at a time.",
  date: "2017 — Present",
  category: "Hobby"
};

const englishPost = {
  title: "Why English Matters in Gaming",
  excerpt: "How speaking English opened up a world of international communities.",
  content: "For many, English is just a subject in school. For me, it was a survival skill in the digital worlds I frequented. Whether I was navigating complex quest lines in an RPG or coordinating a raid in a multiplayer shooter, English was the bridge that connected me to players from across the globe. Gaming didn't just teach me vocabulary; it taught me how to communicate effectively under pressure and how to build friendships across cultural boundaries. Today, I see English not just as a language, but as a key that unlocks international communities and endless learning opportunities.",
  date: "Childhood — Present",
  category: "Language"
};

if (postTitles.includes(modelKitPost.title)) {
  updatePost.run(modelKitPost.excerpt, modelKitPost.content, modelKitPost.date, modelKitPost.category, modelKitPost.title);
} else {
  insertPost.run(modelKitPost.title, modelKitPost.excerpt, modelKitPost.content, modelKitPost.date, modelKitPost.category);
}

if (postTitles.includes(englishPost.title)) {
  updatePost.run(englishPost.excerpt, englishPost.content, englishPost.date, englishPost.category, englishPost.title);
} else {
  insertPost.run(englishPost.title, englishPost.excerpt, englishPost.content, englishPost.date, englishPost.category);
}

// Seed data if empty or missing specific projects
const existingProjects = db.prepare("SELECT title FROM projects").all() as { title: string }[];
const projectTitles = existingProjects.map(p => p.title);

const insertProject = db.prepare("INSERT INTO projects (title, description, link, tags, image) VALUES (?, ?, ?, ?, ?)");

if (!projectTitles.includes("Personal Portfolio")) {
  insertProject.run("Personal Portfolio", "A minimalist portfolio built with React and Tailwind.", "#", "React, Tailwind, SQLite", "https://picsum.photos/seed/portfolio/800/600");
}
if (!projectTitles.includes("School Documentary")) {
  insertProject.run("School Documentary", "Documentary Project for my school's Practical exam.", "#", "Video, Documentary, School Project", "https://picsum.photos/seed/doc/800/600");
}
if (!projectTitles.includes("Gaming Community Hub")) {
  insertProject.run("Gaming Community Hub", "A concept for a local gaming community platform.", "#", "Design, Community", "https://picsum.photos/seed/gaming/800/600");
}
if (!projectTitles.includes("Culinary Photography")) {
  insertProject.run("Culinary Photography", "Capturing the art of food and dining experiences.", "#", "Photography, Culinary", "https://ais-dev-rhp4priwxi4o7tigutfcth-30817385084.asia-east1.run.app/api/placeholder/fried-rice.jpg");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/blog", (req, res) => {
    const posts = db.prepare("SELECT * FROM blog_posts ORDER BY id DESC").all();
    res.json(posts);
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects").all();
    res.json(projects);
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact form submission:", { name, email, message });
    res.json({ success: true, message: "Message received!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
