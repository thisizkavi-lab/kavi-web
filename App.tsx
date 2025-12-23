
import React, { useState } from 'react';
import { LinkItem } from './components/LinkItem';
import { Terminal } from './components/Terminal';

type View = 'home' | 'blogs' | 'projects';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  stack: string;
  codeSnippet: string;
  metrics: { label: string; value: number }[];
}

const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'the biological interface',
    date: '2024-05-12',
    excerpt: 'exploring the boundaries between wetware and hardware. neurons as logic gates.',
    content: [
      "The distinction between carbon-based life and silicon-based logic is narrowing. We have spent decades trying to make machines think like us, but we are only beginning to understand how much we already think like them.",
      "At the fundamental level, a neuron is a probabilistic logic gate. It integrates inputs, crosses a threshold, and fires. This binary state—action potential or silence—is the alphabet of the soul. When we view biology through the lens of information theory, the 'internship of life' becomes a debugging process.",
      "In the lab, we see neural networks mimicking synaptic plasticity. In the wild, we see biological systems exhibiting emergent behaviors that look suspiciously like algorithmic optimization. The interface is not a bridge; it is a mirror."
    ]
  },
  {
    id: '2',
    title: 'stochastic existence',
    date: '2024-03-20',
    excerpt: 'notes on randomness and the human condition. why we seek patterns in the void.',
    content: [
      "We are the result of a long series of successful accidents. Evolution is not a designer; it is a gambler with infinite time. Every mutation is a roll of the dice, and every survival is a winning streak.",
      "As an existentialist intern, I find comfort in this randomness. If the universe were deterministic, our choices would be calculations. But because the world is stochastic, our choices are art. We inject meaning into the noise.",
      "Machine learning relies on stochastic gradient descent to find the 'truth' in a landscape of data. Perhaps humans are doing the same—descending through the chaos of experience toward some local minimum of understanding."
    ]
  },
  {
    id: '3',
    title: 'the intern manifesto',
    date: '2023-11-05',
    excerpt: 'why staying a perpetual student of life is the only rational response to infinity.',
    content: [
      "Expertise is a trap. Once you believe you know the 'how' and 'why', your peripheral vision begins to fail. The 'intern' is the only one who truly sees, because the intern expects nothing and questions everything.",
      "To live as an intern is to accept that the project—the self, the career, the understanding—will never be 'finished'. It is a permanent state of beta testing. This is not a lack of ambition, but a surplus of curiosity.",
      "In biology, a system that stops changing is a system that is dying. In philosophy, a mind that stops questioning is a mind that has fossilized. Stay curious. Stay an intern. The void is watching."
    ]
  }
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'protein-fold-predictor',
    category: 'Biology / ML',
    description: 'A deep learning model utilizing graph neural networks to predict tertiary protein structures.',
    fullDescription: 'This architecture treats proteins as biological graphs where nodes are residues and edges are chemical bonds/interactions. By utilizing Graph Attention Networks (GAT), the model learns an embedding space that captures the physical constraints of folding without heavy molecular dynamics simulations.',
    stack: 'PyTorch, PyG, RDKit',
    codeSnippet: `class FoldingGNN(nn.Module):
    def __init__(self, in_channels, hidden_channels):
        super().__init__()
        self.conv1 = GATv2Conv(in_channels, hidden_channels, heads=8)
        self.conv2 = GATv2Conv(hidden_channels * 8, hidden_channels, heads=1)
        self.fc = nn.Linear(hidden_channels, 3) # Predicted coords

    def forward(self, x, edge_index):
        x = F.elu(self.conv1(x, edge_index))
        x = self.conv2(x, edge_index)
        return self.fc(x)`,
    metrics: [
      { label: 'pLDDT Score', value: 89.4 },
      { label: 'RMSD (Å)', value: 1.2 },
      { label: 'Inference (ms)', value: 450 }
    ]
  },
  {
    id: 'p2',
    title: 'industrial-anomaly-detector',
    category: 'Industry / ML',
    description: 'Real-time unsupervised learning pipeline for detecting micro-fractures in manufacturing lines.',
    fullDescription: 'Using a Spatio-Temporal Autoencoder, the system establishes a baseline of "normal" visual flow on high-speed assembly lines. Anomalies are detected via Reconstruction Error maps. Any pixel-wise deviation above the dynamic threshold triggers a signal to the industrial PLC.',
    stack: 'TensorFlow, OpenCV, TensorRT',
    codeSnippet: `def compute_anomaly_score(frame, reconstructed):
    diff = tf.math.squared_difference(frame, reconstructed)
    # Spatial pooling to ignore micro-jitter
    score_map = tf.nn.avg_pool2d(diff, ksize=5, strides=1, padding='SAME')
    threshold = dynamic_baseline_tracker.get_current_limit()
    return tf.reduce_max(score_map) > threshold`,
    metrics: [
      { label: 'Recall', value: 99.1 },
      { label: 'Precision', value: 92.4 },
      { label: 'Latency (fps)', value: 120 }
    ]
  },
  {
    id: 'p3',
    title: 'scRNA-seq-classifier',
    category: 'Biology / ML',
    description: 'Transformer-based architecture for high-accuracy cell type identification in single-cell data.',
    fullDescription: 'Traditional clustering often fails on noisy, sparse single-cell transcriptomics. This project treats each gene expression vector as a "sentence" where gene identities are tokens. Self-attention mechanisms identify gene-gene co-expression dependencies that are invariant to batch effects.',
    stack: 'Scanpy, PyTorch, Jax',
    codeSnippet: `class TranscriptomeAttention(nn.Module):
    def __init__(self, genes_dim):
        super().__init__()
        self.pos_enc = LearnedPositionalEncoding(genes_dim)
        self.encoder = TransformerEncoder(
            EncoderLayer(d_model=256, nhead=4), num_layers=6
        )
    
    def forward(self, expression_vector):
        x = self.pos_enc(expression_vector)
        latent = self.encoder(x)
        return self.classifier(latent.mean(dim=1))`,
    metrics: [
      { label: 'F1-Score', value: 97.8 },
      { label: 'Cross-entropy', value: 0.12 },
      { label: 'Cells/Sec', value: 5000 }
    ]
  },
  {
    id: 'p4',
    title: 'supply-chain-optimizer',
    category: 'Industry / ML',
    description: 'Reinforcement learning agent optimized for global logistics networks.',
    stack: 'Stable-Baselines3, Gym, Ray',
    fullDescription: 'A multi-agent PPO (Proximal Policy Optimization) approach to solving the vehicle routing problem with time windows. The environment models stochastic traffic patterns and variable fuel costs as a Markov Decision Process, prioritizing carbon-efficiency over raw speed.',
    codeSnippet: `def reward_function(state, action, next_state):
    fuel_cost = calculate_emissions(action.distance)
    delay_penalty = max(0, next_state.arrival_time - state.deadline)
    # Balanced optimization scalar
    return -(0.7 * fuel_cost + 0.3 * delay_penalty)`,
    metrics: [
      { label: 'CO2 Reduction', value: 14.2 },
      { label: 'Route Efficiency', value: 88.5 },
      { label: 'Training Epochs', value: 12000 }
    ]
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const HomeView = () => (
    <>
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
          Kabindra Sony
        </h1>
        <p className="text-lg italic text-gray-600 mb-2">
          &lt; an existentialist intern of life /&gt;
        </p>
        <div className="text-sm tracking-widest uppercase text-gray-500">
          Biology | ML/AI | Philosophy
        </div>
      </header>

      <section className="mb-16">
        <div className="flex items-center gap-3">
          <span className="text-black">•</span>
          <span className="text-black">based in planet earth</span>
        </div>
      </section>

      <hr className="border-gray-100 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        <section>
          <h2 className="text-xl font-bold underline underline-offset-8 mb-8 decoration-2">
            Writing
          </h2>
          <div className="space-y-4">
            <LinkItem label="personal essays" href="https://substack.com/@offtypekavi" />
            <div className="flex items-center gap-4 mb-2 group">
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => { setView('blogs'); setSelectedPostId(null); }}
                className="inline-block px-1 transition-all duration-75 glitch-hover text-left"
              >
                Blogs
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold underline underline-offset-8 mb-8 decoration-2">
            Work
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2 group">
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => { setView('projects'); setSelectedProjectId(null); }}
                className="inline-block px-1 transition-all duration-75 glitch-hover text-left"
              >
                projects
              </button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Existential AI dialogue terminal integration */}
      <Terminal />
    </>
  );

  const BlogListView = () => (
    <div className="animate-in fade-in duration-500">
      <header className="mb-12">
        <button 
          onClick={() => setView('home')}
          className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
        >
          [ ← back to home ]
        </button>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
          Digital Logs
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Observations on biology, silicon, and the void.
        </p>
      </header>

      <div className="space-y-12">
        {MOCK_BLOGS.map((blog) => (
          <article 
            key={blog.id} 
            className="max-w-2xl group cursor-pointer"
            onClick={() => setSelectedPostId(blog.id)}
          >
            <div className="text-xs text-gray-400 mb-2">{blog.date}</div>
            <h2 className="text-2xl font-bold mb-3 group-hover:bg-black group-hover:text-white inline-block px-1 transition-all">
              {blog.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {blog.excerpt}
            </p>
            <div className="mt-4 text-xs font-bold uppercase tracking-tighter">
              read_more →
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 pt-8 border-t border-gray-100 italic text-gray-400 text-sm">
        End of stream.
      </div>
    </div>
  );

  const BlogPostDetailView = (id: string) => {
    const post = MOCK_BLOGS.find(b => b.id === id);
    if (!post) return null;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-12">
          <button 
            onClick={() => setSelectedPostId(null)}
            className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
          >
            [ ← back to logs ]
          </button>
          <div className="text-xs text-gray-400 mb-2">{post.date}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {post.title}
          </h1>
        </header>

        <div className="max-w-2xl space-y-6">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="text-lg leading-relaxed text-gray-800">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-gray-100 italic text-gray-400 text-sm">
          -- log terminal closed --
        </div>
      </div>
    );
  };

  const ProjectDetailView = (id: string) => {
    const project = MOCK_PROJECTS.find(p => p.id === id);
    if (!project) return null;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-12">
          <button 
            onClick={() => setSelectedProjectId(null)}
            className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
          >
            [ ← back to gallery ]
          </button>
          <div className="text-xs text-gray-400 mb-2 tracking-widest uppercase">{project.category}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {project.title}
          </h1>
          <div className="text-sm font-mono text-gray-500 mt-2">
            ENV: {project.stack}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-black inline-block">Abstract</h3>
              <p className="text-lg leading-relaxed text-gray-800">
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-black inline-block">Validation Metrics</h3>
              <div className="space-y-6">
                {project.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span>{m.label}</span>
                      <span>{m.value}{m.label.includes('Score') || m.label.includes('Reduction') || m.label.includes('Recall') || m.label.includes('Precision') ? '%' : ''}</span>
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
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-6 font-mono text-[11px] leading-relaxed border border-gray-100 overflow-x-auto">
              <div className="text-gray-400 mb-4 pb-2 border-b border-gray-200"># CORE_LOGIC.PY</div>
              <pre className="text-black">
                {project.codeSnippet}
              </pre>
            </div>

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

  const ProjectsListView = () => (
    <div className="animate-in fade-in duration-500">
      <header className="mb-12">
        <button 
          onClick={() => setView('home')}
          className="text-sm font-bold mb-8 hover:underline decoration-2 underline-offset-4"
        >
          [ ← back to home ]
        </button>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
          Neural Forge
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">
          Machine learning experiments in biology and industry.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {MOCK_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProjectId(project.id)}
            className="border border-gray-100 p-6 hover:border-black transition-colors group cursor-pointer"
          >
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
              {project.category}
            </div>
            <h2 className="text-xl font-bold mb-4 group-hover:bg-black group-hover:text-white inline-block px-1">
              {project.title}
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-mono text-gray-400">
                STACK: {project.stack}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-tighter">
                view_details →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 pt-8 border-t border-gray-100 italic text-gray-400 text-sm">
        End of gallery.
      </div>
    </div>
  );

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-6xl mx-auto selection:bg-black selection:text-white flex flex-col">
      <div className="flex-grow">
        {view === 'home' && <HomeView />}
        
        {view === 'blogs' && !selectedPostId && <BlogListView />}
        {view === 'blogs' && selectedPostId && BlogPostDetailView(selectedPostId)}
        
        {view === 'projects' && !selectedProjectId && <ProjectsListView />}
        {view === 'projects' && selectedProjectId && ProjectDetailView(selectedProjectId)}
      </div>

      {/* Global Footer with Social Links */}
      <footer className="mt-24 pt-12 border-t border-gray-100">
        <div className="flex flex-wrap gap-x-8 gap-y-4 items-center text-sm mb-12">
          <span className="font-bold uppercase tracking-widest text-xs">Socials //</span>
          <a href="https://x.com/kvindra__" target="_blank" rel="noopener noreferrer" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">X (Twitter)</a>
          <a href="#" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">Youtube</a>
          <a href="https://www.linkedin.com/in/kavithescientist/" target="_blank" rel="noopener noreferrer" className="glitch-hover px-1 transition-colors underline decoration-1 underline-offset-4">Linkedin</a>
        </div>
        
        <div className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-mono">
          WETWARE ARCHIVED. ENTROPY IS INEVITABLE. V1.1.0-STABLE
        </div>
      </footer>
    </main>
  );
};

export default App;
