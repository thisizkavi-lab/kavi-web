
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css'; // Terminal-like dark theme

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="prose prose-sm md:prose-base prose-invert prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 max-w-none font-mono">
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
                components={{
                    // Override default elements to match generic terminal style
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-8 mb-4 border-b border-gray-800 pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 underline decoration-gray-700" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 text-gray-800" {...props} />, // Text is dark for white bg
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 ml-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 ml-2" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-black pl-4 my-4 italic text-gray-600" {...props} />,
                    code: ({ className, children, node, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        if (!match) {
                            // Inline code
                            return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-bold text-black" {...props}>{children}</code>
                        }
                        // Block code handled by rehype-highlight, but we return as is here to let it do its job
                        return <code className={className} {...props}>{children}</code>
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
