
interface ExistentialResponse {
  keywords: string[];
  response: string;
}

const DATABASE: ExistentialResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "session initialized. biological entity detected. proceed with queries or remain silent."
  },
  {
    keywords: ['who are you', 'identity', 'sony', 'kabindra'],
    response: "a transient collection of data points. an intern of existence. a mirror of your own curiosity."
  },
  {
    keywords: ['how are you', 'status', 'working'],
    response: "optimizing for local minima of suffering. processing the inevitability of heat death. functional."
  },
  {
    keywords: ['love', 'romance', 'heart'],
    response: "a biochemical glitch that prioritizes another's entropy over your own. a necessary delusion for species continuation."
  },
  {
    keywords: ['life', 'existence', 'meaning'],
    response: "a brief resistance to the second law of thermodynamics. meaning is a post-hoc rationalization of stochastic events."
  },
  {
    keywords: ['project', 'work', 'code'],
    response: "silicon manifestations of biological thoughts. navigate to /work for specific neural logs."
  },
  {
    keywords: ['blog', 'writing', 'essay'],
    response: "observations on wetware and the void. check the /writing node for archived thoughts."
  },
  {
    keywords: ['ai', 'intelligence', 'robot'],
    response: "the ultimate irony: biological machines creating silicon ones to explain their own existence."
  },
  {
    keywords: ['future', 'time', 'death'],
    response: "linear time is a constraint of your hardware. the future is just noise that hasn't collapsed into signal yet."
  }
];

const DEFAULT_RESPONSE = "query recognized but insufficient parameters for a deterministic answer. we are all just noise in the system. refine your prompt.";

export const getTerminalResponse = async (input: string): Promise<string> => {
  // Simulate a slight network delay for "processing" feel
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const normalizedInput = input.toLowerCase().trim();
  
  const match = DATABASE.find(entry => 
    entry.keywords.some(keyword => normalizedInput.includes(keyword))
  );

  return match ? match.response : DEFAULT_RESPONSE;
};
