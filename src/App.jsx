import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import TradeSelection from './components/TradeSelection'
import WorkingScreen from './components/WorkingScreen'

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [workspace, setWorkspace] = useState(null)

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />
  if (!workspace) return <TradeSelection onSelect={setWorkspace} />
  return <WorkingScreen workspace={workspace} onReset={() => setWorkspace(null)} />
}