import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Gamepad2, 
  Hammer, 
  Languages,
  Menu,
  X
} from "lucide-react";

// --- Types ---
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  tags: string;
}

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pages = ["Profile", "Work"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-serif italic tracking-tight cursor-pointer"
          onClick={() => setActivePage("Profile")}
        >
          Darren Tao
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`text-sm tracking-widest uppercase transition-all relative ${
                activePage === page ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {page}
              {activePage === page && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-px bg-white"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-[#0a0a0a] border-b border-white/5 p-6 md:hidden flex flex-col gap-4"
          >
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => {
                  setActivePage(page);
                  setIsOpen(false);
                }}
                className={`text-left text-lg tracking-widest uppercase ${
                  activePage === page ? "text-white" : "text-muted"
                }`}
              >
                {page}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto pt-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-muted uppercase tracking-[0.4em] text-[10px] mb-6 block font-mono">High School Student</span>
      <h1 className="text-7xl md:text-[10rem] font-serif italic leading-[0.85] mb-12 tracking-tighter">
        Darren <br />
        <span className="text-muted/40">Tao</span>
      </h1>
      <p className="text-xl md:text-3xl text-muted max-w-2xl leading-relaxed font-light text-balance">
        A student at SMAK Frateran Surabaya with a passion for gaming, model kit building, and global communication.
      </p>
      
      <div className="mt-16 flex flex-wrap items-center gap-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 bg-white text-black rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all"
        >
          Explore Work
        </motion.button>
        <div className="flex items-center gap-8 text-muted">
          <a 
            href="https://www.instagram.com/taotaodestiny?igsh=MWJnYzlwd3d6OXMzYw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] font-semibold"
          >
            Instagram
          </a>
          <a 
            href="https://x.com/TAOTAODESTINY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] font-semibold"
          >
            Twitter
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
          <a 
            href="mailto:darrentao120907@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

const About = () => (
  <section className="py-40 px-6 max-w-5xl mx-auto border-t border-white/5">
    <div className="grid md:grid-cols-2 gap-24 items-start mb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-muted uppercase tracking-[0.3em] text-[10px] mb-6 block font-mono">01 / Introduction</span>
        <h2 className="text-5xl font-serif italic mb-10">About Me</h2>
        <div className="space-y-8 text-muted font-light leading-relaxed text-lg">
          <p>
            I'm Darren Tao, currently pursuing my high school education at SMAK Frateran Surabaya. 
            My world revolves around precision, strategy, and expression.
          </p>
          <p>
            I am highly adaptable and proficient in English, with a foundational understanding of Japanese and Chinese. 
            I take pride in being a source of motivation for my peers and a versatile gamer capable of mastering any challenge.
          </p>
          <p>
            I am a deeply emotional and empathetic person. While I am constantly working on my emotional resilience and self-awareness, 
            I believe my sensitivity allows me to connect more deeply with others and find genuine meaning in life.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Gamepad2 size={20} />, title: "Gaming", desc: "Strategic thinking and competitive play." },
            { icon: <Hammer size={20} />, title: "Model Kits", desc: "Patience and precision in building." },
            { icon: <Languages size={20} />, title: "English", desc: "Fluent global communication." },
            { icon: <Languages size={20} />, title: "Indonesian", desc: "Native proficiency and cultural roots." }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass rounded-3xl group hover:bg-white/5 transition-all"
            >
              <div className="mb-6 text-muted group-hover:text-white transition-colors">{item.icon}</div>
              <h3 className="text-sm font-medium mb-2 uppercase tracking-widest">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group"
      >
        <img 
          src="https://picsum.photos/seed/darren-tao/800/1000" 
          alt="Darren Tao" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>
    </div>

    {/* Goals Section */}
    <div className="grid md:grid-cols-3 gap-16 mt-40">
      <div className="md:col-span-1">
        <span className="text-muted uppercase tracking-[0.3em] text-[10px] mb-4 block font-mono">02 / Aspirations</span>
        <h2 className="text-5xl font-serif italic">My Goals</h2>
      </div>
      <div className="md:col-span-2">
        <p className="text-2xl md:text-3xl text-muted font-light leading-relaxed text-balance">
          My ultimate goal is to travel to <span className="text-white italic">Japan or China</span> with my family. 
          I strive to build financial stability through disciplined saving, embrace new experiences, 
          discover a meaningful purpose in life, and connect with diverse communities.
        </p>
      </div>
    </div>

    {/* Experience Section */}
    <div className="mt-48">
      <span className="text-muted uppercase tracking-[0.3em] text-[10px] mb-6 block font-mono">03 / Journey</span>
      <h2 className="text-5xl font-serif italic mb-16">Experience</h2>
      <div className="divide-y divide-white/5">
        {[
          { title: "SMAK Frateran Surabaya", role: "High School Student", date: "2023 — 2026" },
          { title: "Model Kit Enthusiast", role: "Independent Hobbyist", date: "2017 — Present" },
          { title: "Gaming Enthusiast", role: "Strategic & Versatile Gamer", date: "Childhood — Present" },
          { title: "English Enthusiast", role: "Fluent Communication", date: "Childhood — Present" }
        ].map((exp, i) => (
          <motion.div 
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 hover:px-4 transition-all duration-500"
          >
            <div>
              <h3 className="text-2xl font-medium mb-1 group-hover:italic transition-all">{exp.title}</h3>
              <p className="text-muted text-sm font-light uppercase tracking-widest">{exp.role}</p>
            </div>
            <div className="text-muted text-xs font-mono mt-4 md:mt-0 opacity-50 group-hover:opacity-100 transition-opacity">{exp.date}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = ({ projects }: { projects: Project[] }) => (
  <section className="py-40 px-6 max-w-5xl mx-auto border-t border-white/5">
    {/* Skills Section */}
    <div className="mb-48">
      <span className="text-muted uppercase tracking-[0.3em] text-[10px] mb-6 block font-mono">01 / Capabilities</span>
      <h2 className="text-5xl font-serif italic mb-16">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "English Speaking", "Model Kit Building", 
          "Gundam Lore", "Strategic Gaming", "Narrative Storyteller",
          "Public Speaking", "Creative Writing", "Problem Solving"
        ].map((skill, i) => (
          <motion.div 
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="px-6 py-8 glass rounded-3xl text-center group hover:bg-white hover:text-black transition-all duration-500 cursor-default"
          >
            <span className="text-xs uppercase tracking-widest font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
      <div>
        <span className="text-muted uppercase tracking-[0.3em] text-[10px] mb-4 block font-mono">02 / Selected Work</span>
        <h2 className="text-6xl font-serif italic">Projects</h2>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
          className="group relative p-10 glass rounded-[2.5rem] hover:bg-white/5 transition-all duration-700 overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="flex flex-wrap gap-2">
                {project.tags.split(",").map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10 rounded-full text-muted font-mono">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ExternalLink size={16} />
              </div>
            </div>
            <h3 className="text-3xl font-medium mb-4 group-hover:italic transition-all duration-500">{project.title}</h3>
            <p className="text-muted text-base font-light mb-10 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              {project.description}
            </p>
            <button className="text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 font-semibold group-hover:gap-5 transition-all duration-500">
              Case Study <ChevronRight size={14} />
            </button>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000" />
        </motion.div>
      ))}
    </div>
  </section>
);

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-40 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="mb-24">
        <span className="text-muted uppercase tracking-[0.3em] text-[10px] mb-4 block font-mono">03 / Thoughts</span>
        <h2 className="text-6xl font-serif italic">Journal</h2>
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col md:flex-row gap-8 md:items-center justify-between p-10 glass rounded-[2rem] hover:bg-white/5 transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-6 text-[10px] text-muted mb-6 uppercase tracking-[0.2em] font-mono opacity-60">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{post.category}</span>
              </div>
              <h3 className="text-3xl font-serif italic mb-4 group-hover:translate-x-2 transition-transform duration-500">
                {post.title}
              </h3>
              <p className="text-muted text-base font-light line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
                {post.excerpt}
              </p>
            </div>
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ChevronRight size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 rounded-3xl relative"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 text-muted hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 text-xs text-muted mb-6 uppercase tracking-widest">
                <span>{selectedPost.date}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{selectedPost.category}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">
                {selectedPost.title}
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted font-light leading-relaxed whitespace-pre-wrap">
                  {(selectedPost as any).content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => (
  <section className="py-48 px-6 max-w-5xl mx-auto border-t border-white/5">
    <div className="text-center max-w-3xl mx-auto">
      <span className="text-muted uppercase tracking-[0.4em] text-[10px] mb-8 block font-mono">04 / Connection</span>
      <h2 className="text-7xl md:text-9xl font-serif italic mb-12 tracking-tighter">Get in touch</h2>
      <p className="text-xl text-muted font-light mb-16 leading-relaxed text-balance">
        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
      </p>
      <a 
        href="mailto:darrentao120907@gmail.com"
        className="text-2xl md:text-5xl font-light hover:text-muted transition-all duration-500 border-b border-white/10 pb-4 inline-block"
      >
        darrentao120907@gmail.com
      </a>
      
      <div className="mt-32 flex flex-wrap justify-center gap-12 text-muted">
        {[
          { label: "Instagram", href: "https://www.instagram.com/taotaodestiny?igsh=MWJnYzlwd3d6OXMzYw==" },
          { label: "Twitter", href: "https://x.com/TAOTAODESTINY" },
          { label: "GitHub", href: "https://github.com" }
        ].map((link) => (
          <a 
            key={link.label}
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] font-semibold"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 max-w-5xl mx-auto border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-[10px] uppercase tracking-[0.2em] text-muted">
      © 2026 Darren Tao. All Rights Reserved.
    </div>
    <div className="text-[10px] uppercase tracking-[0.2em] text-muted">
      Built with React & SQLite
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState("Profile");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/blog").then(res => res.json()).then(setBlogPosts);
    fetch("/api/projects").then(res => res.json()).then(setProjects);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black relative overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          {activePage === "Profile" && (
            <motion.div 
              key="profile" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <Hero />
              <About />
            </motion.div>
          )}
          {activePage === "Work" && (
            <motion.div 
              key="work" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Projects projects={projects} />
              <Blog posts={blogPosts} />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
