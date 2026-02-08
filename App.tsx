
import React, { useState, useEffect } from 'react';
import { LinkItem } from './components/LinkItem';
import { Terminal } from './components/Terminal';
import { getBlogs, getProjects, MarkdownFile } from './services/markdownService';
import { MarkdownRenderer } from './components/MarkdownRenderer';

type View = 'home' | 'blogs' | 'research' | 'prototypes';

// Helper to format dates as relative timestamps
const formatRelativeDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Markdown content
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string; // Short description from frontmatter
  stack: string;
  metrics: { label: string; value: number }[];
  content: string; // Full markdown content
  type: 'research' | 'prototype';
  group: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [loadedBlogs, loadedProjects] = await Promise.all([
          getBlogs(),
          getProjects()
        ]);

        setBlogs(loadedBlogs.map(b => ({
          id: b.filename,
          title: b.frontmatter.title || b.filename,
          date: b.frontmatter.date || new Date().toISOString().split('T')[0],
          excerpt: b.frontmatter.excerpt || '',
          content: b.content
        })));

        setProjects(loadedProjects.map(p => ({
          id: p.filename,
          title: p.frontmatter.title || p.filename,
          category: p.frontmatter.category || 'Experiment',
          description: p.frontmatter.description || '',
          stack: p.frontmatter.stack || '',
          metrics: p.frontmatter.metrics || [],
          content: p.content,
          type: (p.frontmatter.type as 'research' | 'prototype') || 'research',
          group: p.frontmatter.group || 'implementation'
        })));
      } catch (e) {
        console.error("Failed to load content", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const HomeView = () => (
    <>
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black flex items-baseline gap-4">
          Kavi <span className="text-base font-normal text-gray-400 font-mono tracking-normal">Kabindra Sony</span>
        </h1>

        <div className="space-y-2 text-sm md:text-base">
          <p className="font-mono text-gray-600">
            &lt; making_biology_programmable /&gt;
          </p>

          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-500 font-mono text-xs uppercase tracking-wider">
            <span>In Silico | In Vitro | In Vivo</span>
            <span className="hidden md:inline text-gray-300">/</span>
            <span>based in planet earth</span>
          </div>
        </div>
      </header>

      <hr className="border-gray-100 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        <section>
          <h2 className="text-xl font-bold underline underline-offset-8 mb-8 decoration-2">
            /reflections
          </h2>
          <div className="space-y-4">
            <LinkItem label="substack [offtypekavi]" href="https://substack.com/@offtypekavi" />
            <div className="flex items-center gap-4 mb-2 group">
              <span className="text-gray-400">•</span>
              <button
                onClick={() => { setView('blogs'); setSelectedPostId(null); }}
                className="inline-block px-1 transition-all duration-75 glitch-hover text-left"
                aria-label="View logs"
              >
                /logs
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold underline underline-offset-8 mb-8 decoration-2">
            /lab
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2 group">
              <span className="text-gray-400">•</span>
              <button
                onClick={() => { setView('research'); setSelectedProjectId(null); }}
                className="inline-block px-1 transition-all duration-75 glitch-hover text-left"
                aria-label="View research"
              >
                research
              </button>
            </div>
            <div className="flex items-center gap-4 mb-2 group">
              <span className="text-gray-400">•</span>
              <button
                onClick={() => { setView('prototypes'); setSelectedProjectId(null); }}
                className="inline-block px-1 transition-all duration-75 glitch-hover text-left"
                aria-label="View prototypes"
              >
                prototypes
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Existential AI dialogue terminal integration */}
      <Terminal onNavigate={(v: 'home' | 'blogs' | 'research' | 'prototypes') => {
        // @ts-ignore - Terminal props might be strict on 'projects' which we are replacing
        setView(v === 'projects' ? 'research' : v);
        setSelectedPostId(null);
        setSelectedProjectId(null);
      }} />
    </>
  );

  const BlogListView = () => (
    <div className="animate-in fade-in duration-500">
      <header className="mb-12">
        <button
          onClick={() => setView('home')}
          className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
          aria-label="Go back to home"
        >
          [ ← back to home ]
        </button>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
          /logs
        </h1>
        <p className="text-sm text-gray-500 tracking-widest">
          a verbose log of my thoughts & consciousness
        </p>
      </header>

      <div className="space-y-12">
        {isLoading ? (
          <div className="text-sm font-mono text-gray-400 animate-pulse">loading_neural_logs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-sm font-mono text-gray-400">no logs found_</div>
        ) : (
          blogs.map((blog) => (
            <article
              key={blog.id}
              className="max-w-2xl group cursor-pointer"
              onClick={() => setSelectedPostId(blog.id)}
            >
              <div className="text-xs text-gray-400 mb-2" title={blog.date}>{formatRelativeDate(blog.date)}</div>
              <h2 className="text-2xl font-bold mb-3 group-hover:bg-black group-hover:text-white inline-block px-1 transition-all">
                {blog.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="mt-4 text-xs font-bold uppercase tracking-tighter">
                read_more →
              </div>
            </article>
          ))
        )}
      </div>

      <div className="mt-24 pt-8 border-t border-gray-100 italic text-gray-400 text-sm">
        End of stream.
      </div>
    </div>
  );

  const BlogPostDetailView = (id: string) => {
    const post = blogs.find(b => b.id === id);
    if (!post) return null;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-12">
          <button
            onClick={() => setSelectedPostId(null)}
            className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
            aria-label="Go back to blog list"
          >
            [ ← back to logs ]
          </button>
          <div className="text-xs text-gray-400 mb-2" title={post.date}>{formatRelativeDate(post.date)}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {post.title}
          </h1>
        </header>

        <div className="max-w-3xl">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="mt-24 pt-8 border-t border-gray-100 italic text-gray-400 text-sm">
          -- log terminal closed --
        </div>
      </div>
    );
  };

  const ProjectDetailView = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return null;

    const backView = project.type === 'prototype' ? 'prototypes' : 'research';
    const backLabel = project.type === 'prototype' ? 'prototypes' : 'research';

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-12">
          <button
            onClick={() => { setSelectedProjectId(null); setView(backView); }}
            className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
            aria-label={`Go back to ${backLabel}`}
          >
            [ ← back to {backLabel} ]
          </button>
          <div className="text-xs text-gray-400 mb-2 tracking-widest uppercase">{project.category}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {project.title}
          </h1>
          <div className="text-sm font-mono text-gray-500 mt-2">
            ENV: {project.stack}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <MarkdownRenderer content={project.content} />
          </div>

          {/* Sidebar for Metrics / Extra Info */}
          <div className="space-y-8">
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-black inline-block">Validation Metrics</h3>
                <div className="space-y-6">
                  {project.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span>{m.label}</span>
                        <span>{m.value}{m.label.toLowerCase().includes('score') || m.label.toLowerCase().includes('reduction') || m.label.toLowerCase().includes('recall') || m.label.toLowerCase().includes('precision') ? '%' : ''}</span>
                      </div>
                      <div className="h-1 bg-gray-100 w-full overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-1000"
                          style={{ width: `${Math.min(100, m.value > 100 ? 100 : m.value)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-gray-100 p-6 bg-white shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Latency Curve / Simulation</div>
              <div className="h-32 flex items-end gap-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 flex-1 hover:bg-black transition-colors"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-gray-100 italic text-gray-400 text-sm">
          -- neural weights exported --
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <article
      onClick={() => setSelectedProjectId(project.id)}
      className="border border-gray-100 p-6 hover:border-black transition-colors group cursor-pointer h-full flex flex-col"
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
        {project.category}
      </div>
      <h3 className="text-lg font-bold mb-3 group-hover:bg-black group-hover:text-white inline-block px-1">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
        {project.description}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <div className="text-[10px] font-mono text-gray-400 truncate max-w-[70%]">
          {project.stack}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-tighter">
          view →
        </div>
      </div>
    </article>
  );

  const ResearchView = () => {
    const researchProjects = projects.filter(p => p.type === 'research');
    const implementations = researchProjects.filter(p => p.group === 'implementation');
    const literature = researchProjects.filter(p => p.group === 'literature');

    return (
      <div className="animate-in fade-in duration-500">
        <header className="mb-12">
          <button
            onClick={() => setView('home')}
            className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
          >
            [ ← back to home ]
          </button>
          <div className="mb-2 text-xs font-mono text-gray-500 uppercase tracking-widest">/lab/research</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
            The Input
          </h1>
          <p className="text-sm text-gray-500 tracking-widest">
            Learning, implementing, and understanding the world.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-xl font-bold border-b border-black pb-4 mb-8">Paper Implementations</h2>
          {implementations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {implementations.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="text-sm font-mono text-gray-400 italic">No implementations yet.</div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-4 mb-8 text-gray-600">Literature & Studies</h2>
          {literature.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {literature.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="text-sm font-mono text-gray-400 italic">Reading list empty.</div>
          )}
        </section>
      </div>
    );
  };

  const PrototypesView = () => {
    const prototypeProjects = projects.filter(p => p.type === 'prototype');
    const sandbox = prototypeProjects.filter(p => p.group === 'sandbox');
    const functional = prototypeProjects.filter(p => p.group === 'functional');
    const ventures = prototypeProjects.filter(p => p.group === 'ventures');

    return (
      <div className="animate-in fade-in duration-500">
        <header className="mb-12">
          <button
            onClick={() => setView('home')}
            className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
          >
            [ ← back to home ]
          </button>
          <div className="mb-2 text-xs font-mono text-gray-500 uppercase tracking-widest">/lab/prototypes</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
            The Output
          </h1>
          <p className="text-sm text-gray-500 tracking-widest">
            Building, creating, and shipping.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-xl font-bold border-b border-black pb-4 mb-8">Functional Builds</h2>
          {functional.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {functional.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="text-sm font-mono text-gray-400 italic">No builds deployed.</div>
          )}
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-4 mb-8 text-gray-600">The Sandbox</h2>
          {sandbox.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sandbox.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="text-sm font-mono text-gray-400 italic">Sandbox empty.</div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-4 mb-8 text-gray-400">Ventures</h2>
          {ventures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ventures.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="text-sm font-mono text-gray-400 italic border border-dashed border-gray-200 p-8 text-center">
              Coming Soon.
            </div>
          )}
        </section>
      </div>
    );
  };

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-6xl mx-auto selection:bg-black selection:text-white flex flex-col">
      <div className="flex-grow">
        {view === 'home' && <HomeView />}

        {view === 'blogs' && !selectedPostId && <BlogListView />}
        {view === 'blogs' && selectedPostId && BlogPostDetailView(selectedPostId)}

        {view === 'research' && !selectedProjectId && <ResearchView />}
        {view === 'research' && selectedProjectId && ProjectDetailView(selectedProjectId)}

        {view === 'prototypes' && !selectedProjectId && <PrototypesView />}
        {view === 'prototypes' && selectedProjectId && ProjectDetailView(selectedProjectId)}
      </div>

      {/* Global Footer with Social Links */}
      <footer className="mt-24 pt-12 border-t border-gray-100">
        <div className="flex flex-wrap gap-x-8 gap-y-4 items-center text-sm mb-12">
          <span className="font-bold uppercase tracking-widest text-xs">Socials //</span>
          <a href="https://x.com/kvindra__" target="_blank" rel="noopener noreferrer" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">X (Twitter)</a>
          <a href="https://www.youtube.com/@kavi-youtube" target="_blank" rel="noopener noreferrer" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">Youtube</a>
          <a href="https://github.com/thisizkavi-lab" target="_blank" rel="noopener noreferrer" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">Github</a>
          <a href="https://www.linkedin.com/in/kavithescientist/" target="_blank" rel="noopener noreferrer" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">Linkedin</a>
        </div>

        <div className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-mono">
          GAINING_ROOT_ACCESS_TO_BIOLOGY.
        </div>
      </footer>
    </main>
  );
};

export default App;
