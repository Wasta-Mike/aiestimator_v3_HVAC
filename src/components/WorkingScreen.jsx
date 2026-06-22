import { supabase } from '../lib/supabase'
import ChatPanel from './ChatPanel'
import SidePanel from './SidePanel'

export default function WorkingScreen({ workspace, session, onReset }) {
  const handleSignOut = () => supabase.auth.signOut()

  return (
    <div className="h-screen bg-navy-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 bg-navy-900 border-b border-navy-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          <span className="text-white font-semibold text-sm">Estimator</span>
          <span className="text-navy-600 text-sm">|</span>
          <span className="bg-blue-900/50 text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-800">
            {workspace.tradeLabel} — {workspace.projectLabel}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-xs">{session.user.email}</span>
          <button
            onClick={onReset}
            className="text-slate-400 hover:text-white text-xs transition-colors"
          >
            Change Trade
          </button>
          <button
            onClick={handleSignOut}
            className="text-slate-400 hover:text-white text-xs transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ChatPanel workspace={workspace} />
        <SidePanel workspace={workspace} />
      </div>
    </div>
  )
}
