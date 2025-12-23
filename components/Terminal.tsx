
import React, { useState, useRef, useEffect } from 'react';
import { getTerminalResponse } from '../services/terminalService';
import { Message } from '../types';

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'terminal established. initialize query...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getTerminalResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "system.error: core logic failure." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-100 max-w-2xl">
      <div className="text-xs text-gray-400 mb-4 tracking-widest uppercase">
        [ system.dialogue_mode ]
      </div>
      
      <div 
        ref={scrollRef}
        className="h-64 overflow-y-auto mb-4 scrollbar-hide text-sm font-mono"
      >
        {messages.map((m, i) => (
          <div key={i} className="mb-3 leading-relaxed">
            <span className={m.role === 'user' ? 'text-gray-400' : 'font-bold'}>
              {m.role === 'user' ? '> user: ' : '> sony_core: '}
            </span>
            <span>{m.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="animate-pulse flex gap-2 items-center text-sm">
            <span className="font-bold text-gray-400 font-mono">_ processing_thought_loop...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <span className="font-bold">{'>'}</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask something existential..."
          className="flex-1 bg-transparent outline-none border-b border-black placeholder-gray-300 text-sm font-mono"
          autoFocus
        />
      </form>
    </div>
  );
};
