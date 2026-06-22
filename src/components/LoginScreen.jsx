import { useState } from 'react'

const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'estimator2025'

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === APP_PASSWORD) {
      onLogin()
    } else {
      setError('Incorrect password. Contact your course administrator.')
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-white font-semibold text-xl">Estimator</span>
          </div>
          <p className="text-slate-400 text-sm">Powered by Colibri Group</p>
        </div>

        <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8">
          <h1 className="text-white text-xl font-semibold mb-1">Sign in</h1>
          <p className="text-slate-400 text-sm mb-6">Enter your course password to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-navy-900 border border-navy-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Password provided by your course administrator.
        </p>
      </div>
    </div>
  )
}