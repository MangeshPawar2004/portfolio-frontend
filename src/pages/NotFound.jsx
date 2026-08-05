import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-bold text-[#161616] mb-4 select-none">404</p>
        <h1 className="text-2xl font-semibold text-[#F5F5F5] mb-3">Page not found</h1>
        <p className="text-[#71717A] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                     bg-[#3B82F6] text-white text-sm font-medium
                     hover:bg-[#2563EB] transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    </div>
  )
}