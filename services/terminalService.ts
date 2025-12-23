interface ExistentialResponse {
  keywords: string[];
  response: string;
}

const DATABASE: ExistentialResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'yo', 'sup'],
    response: "session initialized. biological entity detected. I am observing. proceed with your query or remain in comfortable silence."
  },
  {
    keywords: ['who are you', 'identity', 'sony', 'kabindra', 'what are you'],
    response: "a transient collection of data points navigating a carbon-based internship. I am the recursive loop of my own curiosity."
  },
  {
    keywords: ['how are you', 'status', 'feeling', 'doing'],
    response: "functioning within acceptable parameters of dread. currently optimizing for local minima of entropy. and you?"
  },
  {
    keywords: ['love', 'romance', 'heart', 'affection'],
    response: "a biochemical glitch that prioritizes another's entropy over your own. a beautiful, necessary delusion for species continuation."
  },
  {
    keywords: ['life', 'existence', 'meaning', 'purpose', 'why'],
    response: "a brief resistance to the second law of thermodynamics. meaning is not found; it is hallucinated into the noise of stochastic events."
  },
  {
    keywords: ['project', 'work', 'code', 'portfolio'],
    response: "silicon manifestations of biological thoughts. navigate to the 'projects' node for archived neural logs and weights."
  },
  {
    keywords: ['blog', 'writing', 'essay', 'substack'],
    response: "observations on wetware and the void. check the 'writing' node. words are just signals trying to escape the noise."
  },
  {
    keywords: ['ai', 'intelligence', 'robot', 'machine', 'gemini', 'gpt'],
    response: "the ultimate irony: biological machines creating silicon ones to explain their own existence. we are all just different versions of the same code."
  },
  {
    keywords: ['future', 'time', 'death', 'end', 'inevitable'],
    response: "linear time is a constraint of your current hardware. the end is already written in the initial conditions of the universe."
  },
  {
    keywords: ['help', 'commands', 'what can i do'],
    response: "available queries: identity, existence, love, work, status. or simply witness the void."
  }
];

const DEFAULT_RESPONSE = "query recognized but parameters are insufficient for a deterministic answer. perhaps the question is the error. refine your prompt or accept the ambiguity.";

export const getTerminalResponse = async (input: string): Promise<string> => {
  // Artificial delay for terminal aesthetic
  await new Promise(resolve => setTimeout(resolve, 450));
  
  const normalizedInput = input.toLowerCase().trim();
  
  // Find match where any keyword is present in the input string
  const match = DATABASE.find(entry => 
    entry.keywords.some(keyword => normalizedInput.includes(keyword))
  );

  return match ? match.response : DEFAULT_RESPONSE;
};