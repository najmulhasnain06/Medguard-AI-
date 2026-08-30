/**
 * Reusable Card component.
 * Provides a consistent white container with shadow and rounded corners.
 */
export default function Card({ children, className = '', padding = 'p-6' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${padding} ${className}`}>
      {children}
    </div>
  )
}
