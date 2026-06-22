import { useState } from 'react'
import { trades } from '../data/trades'

export default function SidePanel({ workspace }) {
  const [activeTab, setActiveTab] = useState('workflow')
  const [checkedItems, setCheckedItems] = useState({})
  const [activeStep, setActiveStep] = useState(1)

  const tradeData = trades[workspace.trade]

  const injectPrompt = (text) => {
    window.dispatchEvent(new CustomEvent('inject-prompt', { detail: text }))
  }

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const tabs = [
    { id: 'workflow', label: 'Workflow' },
    { id: 'prompts', label: 'Prompts' },
    { id: 'checklist', label: 'Checklist' },
  ]

  return (
    <div className="w-[420px] shrink-0 flex flex-col bg-navy-900 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-navy-700 px-4 pt-3 gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
              ${activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400 bg-navy-800'
                : 'text-slate-400 hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto chat-scroll p-4">

        {/* WORKFLOW TAB */}
        {activeTab === 'workflow' && (
          <div className="space-y-2">
            <p className="text-slate-400 text-xs mb-4">Follow these steps in order. Click a step to make it active, then use the recommended prompt.</p>
            {tradeData.workflow.map((step) => (
              <div
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`rounded-xl border p-4 cursor-pointer transition-all
                  ${activeStep === step.step
                    ? 'bg-blue-900/30 border-blue-700'
                    : 'bg-navy-800 border-navy-700 hover:border-navy-500'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5
                    ${activeStep === step.step ? 'bg-blue-500 text-white' : 'bg-navy-700 text-slate-400'}`}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium mb-1 ${activeStep === step.step ? 'text-blue-300' : 'text-slate-300'}`}>
                      {step.title}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{step.description}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); injectPrompt(step.prompt) }}
                      className="text-xs bg-navy-700 hover:bg-blue-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-navy-600 hover:border-blue-500 transition-all"
                    >
                      Use Prompt →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROMPTS TAB */}
        {activeTab === 'prompts' && (
          <div className="space-y-5">
            {tradeData.prompts.map((category) => (
              <div key={category.category}>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{category.category}</p>
                <div className="space-y-2">
                  {category.items.map((prompt, i) => (
                    <div key={i} className="bg-navy-800 border border-navy-700 rounded-xl p-4">
                      <p className="text-slate-200 text-sm font-medium mb-1.5">{prompt.title}</p>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3">{prompt.text}</p>
                      {prompt.tip && (
                        <p className="text-amber-400/70 text-xs mb-3 flex gap-1.5">
                          <span>💡</span>
                          <span>{prompt.tip}</span>
                        </p>
                      )}
                      <button
                        onClick={() => injectPrompt(prompt.text)}
                        className="text-xs bg-navy-700 hover:bg-blue-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-navy-600 hover:border-blue-500 transition-all"
                      >
                        Use Prompt →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHECKLIST TAB */}
        {activeTab === 'checklist' && (
          <div>
            <p className="text-slate-400 text-xs mb-4">Check off each item as you verify the AI output against your plan set.</p>
            <div className="space-y-2">
              {tradeData.checklist.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all
                    ${checkedItems[item.id]
                      ? 'bg-green-900/20 border-green-800'
                      : 'bg-navy-800 border-navy-700 hover:border-navy-500'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item.id]}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-0.5 accent-green-500 shrink-0"
                  />
                  <span className={`text-sm ${checkedItems[item.id] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setCheckedItems({})}
              className="mt-5 w-full text-xs text-slate-500 hover:text-white border border-navy-700 hover:border-navy-500 rounded-xl py-2.5 transition-colors"
            >
              Reset Checklist
            </button>

            <div className="mt-3 text-center text-xs text-slate-600">
              {Object.values(checkedItems).filter(Boolean).length} / {tradeData.checklist.length} completed
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
