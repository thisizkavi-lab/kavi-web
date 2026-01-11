import React, { useState, useRef, useEffect } from 'react';
import { getTerminalResponse } from '../services/terminalService';
import { sendAnonymousMessage } from '../services/messageService';
import { Message } from '../types';

interface TerminalProps {
  onNavigate?: (view: 'home' | 'blogs' | 'projects') => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onNavigate }) => {
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
    const command = userMsg.toLowerCase().split(' ')[0];
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Command Interface Logic
    if (['clear', 'cls'].includes(command)) {
      setMessages([{ role: 'model', text: 'terminal history purged.' }]);
      return;
    }

    if (command === 'ls' || command === 'dir') {
      setMessages(prev => [...prev, { role: 'model', text: 'directories accessible:\n- home\n- blogs\n- projects' }]);
      return;
    }

    if (['send', 'msg', 'message'].includes(command)) {
      const payload = userMsg.split(' ').slice(1).join(' ');
      if (!payload) {
        setMessages(prev => [...prev, { role: 'model', text: 'error: empty payload.\nusage: send <your_message>' }]);
        return;
      }

      setIsLoading(true);
      // Visual "encrypting" effect steps
      setMessages(prev => [...prev, { role: 'model', text: 'encrypting packet...' }]);

      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => [...prev, { role: 'model', text: 'routing via neural proxy...' }]);

      const success = await sendAnonymousMessage(payload);

      if (success) {
        setMessages(prev => [...prev, { role: 'model', text: `transmission successful.\nmessage_id: ${Math.random().toString(36).substring(7)}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: 'transmission failed. signal lost.' }]);
      }
      setIsLoading(false);
      return;
    }

    if (onNavigate) {
      if (command.includes('home') || (command === 'cd' && userMsg.split(' ').length === 1) || command === 'cd ..') {
        onNavigate('home');
        setMessages(prev => [...prev, { role: 'model', text: 'navigating to root...' }]);
        return;
      }
      if (command.includes('blog')) {
        onNavigate('blogs');
        setMessages(prev => [...prev, { role: 'model', text: 'accessing neural logs...' }]);
        return;
      }
      if (command.includes('project') || command.includes('work')) {
        onNavigate('projects');
        setMessages(prev => [...prev, { role: 'model', text: 'loading experimental forge...' }]);
        return;
      }
    }

    setIsLoading(true);

    try {
      // Local FAQ service - no external API calls
      const response = await getTerminalResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "system.error: local logic loop interrupted." }]);
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
          <div key={i} className="mb-3 leading-relaxed whitespace-pre-wrap">
            <span className={m.role === 'user' ? 'text-gray-400' : 'font-bold'}>
              {m.role === 'user' ? '> user: ' : '> sony_core: '}
            </span>
            <span>{m.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="animate-pulse flex gap-2 items-center text-sm">
            <span className="font-bold text-gray-400 font-mono">_ processing_stream...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 group">
        <span className="font-bold">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask something or type 'send <msg>'"
          className="flex-1 bg-transparent outline-none border-b border-black placeholder-gray-300 text-sm font-mono focus:border-gray-400 transition-colors"
          autoFocus
        />
      </form>
    </div>
  );
};