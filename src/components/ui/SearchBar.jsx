import { Search } from 'lucide-react'

/**
 * Search input with icon. Used on MedicineSearchPage.
 * Calls onChange(value) on every keystroke and onSubmit() on Enter.
 */
export default function SearchBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search medicine name...',
  className = '',
}) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit?.()
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-4 py-3
          border border-gray-300 rounded-xl
          text-slate-800 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-colors
        "
      />
    </div>
  )
}
