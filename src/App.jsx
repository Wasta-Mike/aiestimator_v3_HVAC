import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LoginScreen from './components/LoginScreen'
import TradeSelection from './components/TradeSelection'
import WorkingScreen from './components/WorkingScreen'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [workspace, setWorkspace] = useState(null) // { trade, projectType }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return <LoginScreen />
  if (!workspace) return <TradeSelection onSelect={setWorkspace} session={session} />
  return <WorkingScreen workspace={workspace} session={session} onReset={() => setWorkspace(null)} />
}
