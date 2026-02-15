import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Environment variables (Vite uses import.meta.env)
  const envVars = [
    {
      key: 'VITE_APP_TITLE',
      value: import.meta.env.VITE_APP_TITLE,
      description: 'Application display title',
    },
    {
      key: 'VITE_API_URL',
      value: import.meta.env.VITE_API_URL,
      description: 'Backend API base URL',
    },
    {
      key: 'VITE_FEATURE_FLAG',
      value: import.meta.env.VITE_FEATURE_FLAG,
      description: 'Feature toggle flag',
    },
  ]

  // Build info from Vite
  const buildInfo = [
    { label: 'Mode', value: import.meta.env.MODE, highlight: true },
    { label: 'Base URL', value: import.meta.env.BASE_URL },
    { label: 'Production', value: import.meta.env.PROD ? 'Yes' : 'No' },
    { label: 'SSR', value: import.meta.env.SSR ? 'Yes' : 'No' },
    { label: 'Timestamp', value: currentTime },
    { label: 'Platform', value: 'Cloudflare Pages' },
  ]

  const features = [
    {
      emoji: '⚡',
      title: 'Vite Build',
      desc: 'Lightning-fast HMR and optimized production builds with Vite.',
    },
    {
      emoji: '🌐',
      title: 'Cloudflare Pages',
      desc: 'Global edge deployment with automatic SSL and instant rollbacks.',
    },
    {
      emoji: '🔐',
      title: 'Environment Variables',
      desc: 'Secure env injection via .env files and Cloudflare dashboard.',
    },
  ]

  const deployChecklist = [
    { text: <span>Push code to a <code>Git</code> repository</span> },
    { text: <span>Connect repo in <code>Cloudflare Pages</code> dashboard</span> },
    { text: <span>Set build command: <code>npm run build</code></span> },
    { text: <span>Set output directory: <code>dist</code></span> },
    { text: <span>Add env vars in <code>Settings → Environment Variables</code></span> },
    { text: <span>Deploy & verify env vars appear in the UI</span> },
  ]

  const appTitle = import.meta.env.VITE_APP_TITLE || 'Cloudflare Pages Demo'

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__badge">
          <span className="pulse"></span>
          Live on {import.meta.env.MODE}
        </div>
        <h1 className="header__title">{appTitle}</h1>
        <p className="header__subtitle">
          A React + Vite proof-of-concept for Cloudflare Pages deployment
          with environment variable injection
        </p>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Top two-column: Env Vars + Build Info */}
        <div className="cards-grid">
          {/* Environment Variables Card */}
          <div className="card" style={{ animationDelay: '0.1s' }}>
            <div className="card__header">
              <div className="card__icon card__icon--env">🔑</div>
              <div>
                <div className="card__title">Environment Variables</div>
                <div className="card__description">
                  Values from <code>.env</code> / Cloudflare dashboard
                </div>
              </div>
            </div>
            <table className="env-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {envVars.map(({ key, value }) => (
                  <tr key={key}>
                    <td>
                      <span className="env-key">{key}</span>
                    </td>
                    <td>
                      <span className={`env-value${!value ? ' env-value--missing' : ''}`}>
                        {value || 'Not set'}
                      </span>
                    </td>
                    <td>
                      <span className={`env-status ${value ? 'env-status--set' : 'env-status--unset'}`}>
                        {value ? '● Set' : '○ Missing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Build Info Card */}
          <div className="card" style={{ animationDelay: '0.2s' }}>
            <div className="card__header">
              <div className="card__icon card__icon--build">🛠️</div>
              <div>
                <div className="card__title">Build Information</div>
                <div className="card__description">
                  Current runtime &amp; build metadata
                </div>
              </div>
            </div>
            <div className="info-grid">
              {buildInfo.map(({ label, value, highlight }) => (
                <div className="info-item" key={label}>
                  <div className="info-item__label">{label}</div>
                  <div className={`info-item__value${highlight ? ' info-item__value--mode' : ''}`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deployment Checklist Card */}
        <div className="card" style={{ animationDelay: '0.25s' }}>
          <div className="card__header">
            <div className="card__icon card__icon--deploy">🚀</div>
            <div>
              <div className="card__title">Deployment Checklist</div>
              <div className="card__description">
                Steps to deploy this app on Cloudflare Pages
              </div>
            </div>
          </div>
          <ul className="checklist">
            {deployChecklist.map((item, i) => (
              <li key={i}>
                <span className="checklist__icon">✓</span>
                <span className="checklist__text">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Feature Highlights */}
        <div className="features">
          {features.map(({ emoji, title, desc }) => (
            <div className="feature" key={title}>
              <span className="feature__emoji">{emoji}</span>
              <div className="feature__title">{title}</div>
              <div className="feature__desc">{desc}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        Built with <span>♥</span> using React + Vite — Deployed on <span>Cloudflare Pages</span>
      </footer>
    </div>
  )
}

export default App
