import { useState, useRef, useEffect } from 'react'
import { trades } from '../data/trades'

export default function ChatPanel({ workspace }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const tradeData = trades[workspace.trade]
  const systemPrompt = tradeData.systemPrompt(workspace.projectLabel)

  useEffect(() => {
    const handler = (e) => {
      setInput(e.detail)
      inputRef.current?.focus()
    }
    window.addEventListener('inject-prompt', handler)
    return () => window.removeEventListener('inject-prompt', handler)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, systemPrompt }),
      })

      const data = await res.json()
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col flex-1 border-r border-navy-700 overflow-hidden">
      <div className="flex-1 overflow-y-auto chat-scroll px-6 py-5 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 bg-blue-900/40 border border-blue-800 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-blue-400 text-xl">⚡</span>
            </div>
            <p className="text-slate-300 font-medium mb-1">Ready to estimate</p>
            <p className="text-slate-500 text-sm max-w-xs">
              Use the Workflow Guide or Prompt Library on the right, or type your own question below.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
            )}
            <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
              ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-sm'
                : 'bg-navy-800 text-slate-200 border border-navy-700 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="bg-navy-800 border border-navy-700 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="px-5 py-4 border-t border-navy-700 bg-navy-900">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask a question or type a prompt..."
            className="flex-1 bg-navy-800 border border-navy-600 text-white text-sm rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500"
            style={{ maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl px-4 py-3 text-sm font-medium transition-colors shrink-0"
          >
            Send
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-2 text-center">
          Always verify AI outputs against your plan set and professional judgment.
        </p>
      </div>
    </div>
  )
}