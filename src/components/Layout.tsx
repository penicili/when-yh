import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center py-6 border-t border-gray-200 text-sm text-gray-400">
        <p>&copy; 2026 WhenYh. Built with React + Vite.</p>
      </footer>
    </div>
  )
}
