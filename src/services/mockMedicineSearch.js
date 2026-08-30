/**
 * Medicine Search Service
 *
 * Searches the local medicine database first. If the medicine is not found
 * locally, falls back to the AI-powered backend search via /api/search-medicine.
 *
 * @param {string} query - The medicine name to search for
 */

import { medicines } from '../data/medicines.js'

/**
 * Search medicines by name (case-insensitive partial match).
 * Returns a list of suggestions for the search dropdown.
 * This searches ONLY the local database -- no AI call for autocomplete
 * (to avoid unnecessary API costs on every keystroke).
 */
export async function searchMedicines(query) {
  // Simulate small network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!query || query.trim().length < 2) return []

  const lowerQuery = query.toLowerCase().trim()

  return medicines
    .filter((med) => med.name.toLowerCase().includes(lowerQuery))
    .map((med) => ({
      id: med.id,
      name: med.name,
      activeIngredient: med.activeIngredient,
    }))
}

/**
 * Get full details for a single medicine by its ID or name.
 * Searches local database first, then falls back to the AI backend.
 *
 * @param {string} identifier - Medicine ID (for local) or search query (for AI)
 * @returns {Promise<object|null>} Medicine info object, or null if truly not found
 */
export async function getMedicineByIdentifier(identifier) {
  // Simulate small delay for local lookup
  await new Promise((resolve) => setTimeout(resolve, 100))

  const lower = identifier.toLowerCase().trim()

  // 1. Try local database first (by ID, then by name)
  const localResult =
    medicines.find((med) => med.id === lower) ||
    medicines.find((med) => med.name.toLowerCase() === lower)

  if (localResult) {
    // Return local result as-is (no aiGenerated flag)
    return localResult
  }

  // 2. Not found locally -- fall back to AI backend
  // Convert the identifier back to a readable query
  // e.g., "aspirin-100mg" -> "Aspirin 100mg"
  const query = identifier.replace(/-/g, ' ')

  try {
    const response = await fetch('/api/search-medicine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      // Backend error -- return null so the "not found" page shows
      console.error(`Medicine search API error: ${response.status}`)
      return null
    }

    const data = await response.json()

    // If the AI couldn't identify the medicine, return null
    if (data.identified === false && !data.name) {
      return null
    }

    // Return the AI-generated result (has aiGenerated: true flag)
    return data
  } catch (error) {
    console.error('Failed to fetch AI medicine info:', error)
    return null
  }
}

/**
 * Get all medicine names (for autocomplete suggestions).
 */
export function getAllMedicineNames() {
  return medicines.map((med) => med.name)
}
