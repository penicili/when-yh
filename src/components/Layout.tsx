import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary/5 text-slate-800">
      <Navbar />
      <main className="flex-1 bg-primary-dark">
        <Outlet />
      </main>
      <footer className="border-t border-primary/10 py-6 text-center text-sm text-accent-warm bg-primary-dark">
        <p>&copy; {new Date().getFullYear()} WhenYh. Brought to you by penicili.</p>
      </footer>
    </div>
  )
}
