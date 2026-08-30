import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, Clock, X, Sparkles } from 'lucide-react'
import Card from '../components/ui/Card'
import SearchBar from '../components/ui/SearchBar'
import { searchMedicines } from '../services/mockMedicineSearch'

export default function MedicineSearchPage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const wrapperRef = useRef(null)

  // Search for suggestions as the user types
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setLoading(true)
    // Debounce: wait 250ms after the user stops typing
    const timer = setTimeout(async () => {
      const results = await searchMedicines(query)
      setSuggestions(results)
      setLoading(false)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectMedicine(medicineId) {
    // Add to recent searches
    setRecentSearches((prev) => {
      const updated = [medicineId, ...prev.filter((s) => s !== medicineId)].slice(0, 5)
      return updated
    })
    setQuery('')
    setShowSuggestions(false)
    navigate(`/medicine/${medicineId}`)
  }

  function handleSubmit() {
    // If there are suggestions, select the first one
    if (suggestions.length > 0) {
      selectMedicine(suggestions[0].id)
    } else if (query.trim().length >= 2) {
      // No local match -- navigate to info page with the query
      // The info page will trigger AI fallback via the backend
      const identifier = query
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
      setRecentSearches((prev) => {
        const updated = [identifier, ...prev.filter((s) => s !== identifier)].slice(0, 5)
        return updated
      })
      setQuery('')
      setShowSuggestions(false)
      navigate(`/medicine/${encodeURIComponent(identifier)}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Page header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchIcon className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Search Medicine Information
        </h1>
        <p className="text-slate-500">
          Look up general information about common medicines available in Pakistan
        </p>
      </div>

      {/* Search bar with suggestions */}
      <div ref={wrapperRef} className="relative mb-8">
        <SearchBar
          value={query}
          onChange={(val) => {
            setQuery(val)
            setShowSuggestions(true)
          }}
          onSubmit={handleSubmit}
          placeholder="Type a medicine name (e.g. Panadol, Brufen)..."
        />

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 mt-2 z-10 max-h-64 overflow-y-auto" padding="p-0">
            {suggestions.map((med) => (
              <button
                key={med.id}
                onClick={() => selectMedicine(med.id)}
                className="w-full text-left px-4 py-3 hover:bg-primary-50 border-b border-gray-50 last:border-0 transition-colors"
              >
                <p className="font-medium text-slate-800">{med.name}</p>
                <p className="text-xs text-slate-500">{med.activeIngredient}</p>
              </button>
            ))}
          </Card>
        )}

        {/* No local results -- suggest AI search */}
        {showSuggestions && query.length >= 2 && !loading && suggestions.length === 0 && (
          <Card className="absolute top-full left-0 right-0 mt-2 z-10" padding="p-4">
            <p className="text-sm text-slate-500 text-center mb-2">
              No local match for "{query}".
            </p>
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Search with AI
            </button>
          </Card>
        )}
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((id) => (
              <button
                key={id}
                onClick={() => selectMedicine(id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-slate-600 hover:bg-primary-50 hover:border-primary-200 transition-colors"
              >
                {id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                <X
                  className="w-3 h-3 text-slate-400 hover:text-slate-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRecentSearches((prev) => prev.filter((s) => s !== id))
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular medicines quick access */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Popular Medicines
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'panadol-500mg', name: 'Panadol 500mg' },
            { id: 'augmentin-625mg', name: 'Augmentin 625mg' },
            { id: 'brufen-400mg', name: 'Brufen 400mg' },
            { id: 'glucophage-500mg', name: 'Glucophage 500mg' },
            { id: 'voltaren-50mg', name: 'Voltaren 50mg' },
            { id: 'risek-20mg', name: 'Risek 20mg' },
          ].map((med) => (
            <button
              key={med.id}
              onClick={() => selectMedicine(med.id)}
              className="text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary-50 hover:border-primary-200 transition-colors"
            >
              {med.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
