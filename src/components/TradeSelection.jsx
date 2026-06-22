import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { trades } from '../data/trades'

export default function TradeSelection({ onSelect, session }) {
  const [selectedTrade, setSelectedTrade] = useState('')
  const [selectedProject, setSelectedProject] = useState('')

  const handleSignOut = () => supabase.auth.signOut()

  const tradeData = selectedTrade ? trades[selectedTrade] : null
  const canProceed = selectedTrade && selectedProject

  const handleEnter = () => {
    if (!canProceed) return
    onSelect({
      trade: selectedTrade,
      tradeLabel: trades[selectedTrade].label,
      projectType: selectedProject,
      projectLabel: trades[selectedTrade].projectTypes.find(p => p.value === selectedProject)?.label,
    })
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="text-white font-semibold">Estimator</span>
          </div>
          <button onClick={handleSignOut} className="text-slate-400 hover:text-white text-sm transition-colors">
            Sign out
          </button>
        </div>

        <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8">
          <h1 className="text-white text-xl font-semibold mb-1">Set Up Your Workspace</h1>
          <p className="text-slate-400 text-sm mb-8">
            Select your trade and project type to load your custom estimating environment.
          </p>

          {/* Trade Selection */}
          <div className="mb-5">
            <label className="block text-slate-300 text-sm mb-2">Your Trade</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(trades).map(([key, trade]) => (
                <button
                  key={key}
                  onClick={() => { if (trade.available) { setSelectedTrade(key); setSelectedProject('') } }}
                  disabled={!trade.available}
                  className={`relative py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left
                    ${selectedTrade === key
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : trade.available
                        ? 'bg-navy-900 border-navy-600 text-slate-300 hover:border-blue-600 hover:text-white'
                        : 'bg-navy-900 border-navy-700 text-slate-600 cursor-not-allowed'
                    }`}
                >
                  {trade.label}
                  {!trade.available && (
                    <span className="absolute top-1.5 right-2 text-xs text-slate-600">Soon</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Project Type */}
          {tradeData && tradeData.available && (
            <div className="mb-8">
              <label className="block text-slate-300 text-sm mb-2">Project Type</label>
              <select
                value={selectedProject}
                onChange={e => setSelectedProject(e.target.value)}
                className="w-full bg-navy-900 border border-navy-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Select project type...</option>
                {tradeData.projectTypes.map(pt => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleEnter}
            disabled={!canProceed}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl py-3 text-sm transition-colors"
          >
            Enter My Workspace →
          </button>
        </div>
      </div>
    </div>
  )
}
