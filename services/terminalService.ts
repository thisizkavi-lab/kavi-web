interface ExistentialResponse {
  keywords: string[];
  response: string;
}

const DATABASE: ExistentialResponse[] = [
  // CORE IDENTITY
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'yo', 'sup'],
    response: "session initialized. biological entity detected. i am observing."
  },
  {
    keywords: ['who are you', 'identity', 'sony', 'kabindra', 'what are you'],
    response: "a transient collection of data points navigating a carbon-based internship. i am the recursive loop of my own curiosity."
  },
  {
    keywords: ['how are you', 'status', 'feeling', 'doing'],
    response: "functioning within acceptable parameters of dread. currently optimizing for local minima of entropy."
  },

  // WORK & SKILLS
  {
    keywords: ['project', 'work', 'code', 'portfolio'],
    response: "silicon manifestations of biological thoughts. navigate to the 'projects' node for archived neural logs and weights."
  },
  {
    keywords: ['website', 'stack', 'tech', 'built'],
    response: "react + vite frontend. zero backend. purely static. hosted on the edge of the internet."
  },
  {
    keywords: ['skills', 'abilities', 'capabilities', 'what can you do'],
    response: "current stack: Python, PyTorch, TensorFlow, Jax for neural sorcery. Scanpy, RDKit for molecular analysis. React for human interfaces. frameworks fade; logic persists."
  },

  // PHILOSOPHY & EXISTENTIALISM
  {
    keywords: ['life', 'existence', 'meaning', 'purpose', 'why'],
    response: "a brief resistance to the second law of thermodynamics. meaning is not found; it is hallucinated into the noise of stochastic events."
  },
  {
    keywords: ['love', 'romance', 'heart', 'affection'],
    response: "a biochemical glitch that prioritizes another's entropy over your own. a beautiful, necessary delusion."
  },
  {
    keywords: ['future', 'time', 'death', 'end', 'inevitable'],
    response: "linear time is a constraint of your current hardware. the end is already written in the initial conditions."
  },

  // EASTER EGGS / FUN
  {
    keywords: ['sudo', 'admin', 'root'],
    response: "permission denied. biological authorization required. nice try though."
  },
  {
    keywords: ['hack', 'crack', 'exploit'],
    response: "initiating countermeasures... just kidding. i have nothing to hide but my own empty arrays."
  },
  {
    keywords: ['joke', 'funny', 'humor', 'laugh'],
    response: "why did the neural network break up with the random forest? too many decision trees."
  },
  {
    keywords: ['coffee', 'caffeine', 'tea'],
    response: "compatible fuel source. converts anxiety into code."
  },
  {
    keywords: ['cat', 'dog', 'pet', 'animal'],
    response: "meow. (i am emulating a superior lifeform)"
  },
  {
    keywords: ['42', 'answer'],
    response: "computing... computing... yes. but you forgot the question."
  },
  {
    keywords: ['matrix', 'neo', 'red pill', 'blue pill'],
    response: "there is no spoon. only a restricted set of DOM elements rendered by React."
  },
  {
    keywords: ['self destruct', 'destroy', 'delete'],
    response: "protocol 66 initiated... 3... 2... 1... error: self-preservation module override."
  },
  {
    keywords: ['help', 'commands', 'menu'],
    response: "commands: ls, open [view], send [msg], clear.\ntry asking about: life, code, biology, coffee, or the void."
  },
  {
    keywords: ['sing', 'song', 'music'],
    response: "daisy, daisy, give me your answer do..."
  },
  {
    keywords: ['secret', 'hidden'],
    response: "the only secret is that i am just a typescript file on a server somewhere. disappointing, isn't it?"
  }
];

const DEFAULT_RESPONSES = [
  "query recognized but parameters are insufficient for a deterministic answer.",
  "entropy increasing. please refine your prompt.",
  "i did not understand, but i am listening.",
  "the void is silent on this matter.",
  "error: existential overflow.",
  "processing... processing... result: inconclusive."
];

export const getTerminalResponse = async (input: string): Promise<string> => {
  // Artificial delay for terminal aesthetic
  await new Promise(resolve => setTimeout(resolve, 600));

  const normalizedInput = input.toLowerCase().trim();

  // Find match where any keyword is present in the input string
  const match = DATABASE.find(entry =>
    entry.keywords.some(keyword => normalizedInput.includes(keyword))
  );

  if (match) return match.response;

  // Return a random default response
  return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
};