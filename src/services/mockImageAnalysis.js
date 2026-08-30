/**
 * Image Analysis Service -- Alibaba Cloud Model Studio Integration
 *
 * This replaces the previous mock implementation with a real AI analysis
 * via our Express backend, which proxies to the Qwen VL multimodal model
 * on Alibaba Cloud DashScope.
 *
 * SECURITY: The API key is NEVER in this file. It lives in .env on the
 * server side only. This file only calls our own /api/analyze endpoint.
 *
 * The function signature stays the same as the original mock so that
 * the existing UI code (ScanMedicinePage, AnalysisPage, useAnalysis hook)
 * works without any changes.
 *
 * @param {File} imageFile - The uploaded image file from the browser
 * @returns {Promise<object>} Structured risk assessment result
 */

/**
 * Convert a browser File object to a base64 data URL string.
 * @param {File} file
 * @returns {Promise<string>} base64 data URL (e.g., "data:image/jpeg;base64,/9j/4AAQ...")
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read the image file. Please try again.'))
    reader.readAsDataURL(file)
  })
}

/**
 * Analyse a medicine packaging image using the real AI backend.
 *
 * @param {File} imageFile - The image file uploaded by the user
 * @param {string} language - Language code ('en' or 'ur')
 * @returns {Promise<object>} Risk assessment with the structure:
 *   {
 *     riskLevel: "LOW_CONCERN" | "NEEDS_VERIFICATION" | "HIGH_CONCERN",
 *     confidence: string,
 *     extractedInfo: { medicineName, activeIngredient, ... },
 *     reasons: string[],
 *     recommendations: string[],
 *     observations: string[],
 *     concerns: string[],
 *     missingInfo: string[],
 *     disclaimer: string
 *   }
 */
export async function analyzeImage(imageFile, language = 'en') {
  // 1. Validate input
  if (!imageFile) {
    throw new Error('No image provided. Please upload a medicine packaging photo.')
  }

  if (!imageFile.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please upload an image file (JPG, PNG, or WEBP).')
  }

  // 2. Convert the file to base64
  const base64DataUrl = await fileToBase64(imageFile)

  // 3. Send to our backend API with language parameter
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: base64DataUrl, language }),
  })

  // 4. Handle HTTP errors
  if (!response.ok) {
    let errorMessage = `Analysis request failed (status ${response.status}).`

    try {
      const errorData = await response.json()
      if (errorData.error) {
        errorMessage = errorData.error
      }
    } catch {
      // If we can't parse the error body, use the default message
    }

    throw new Error(errorMessage)
  }

  // 5. Parse and return the result
  const result = await response.json()

  // Validate that we got a usable result
  if (!result.riskLevel) {
    throw new Error('The server returned an incomplete result. Please try again.')
  }

  return result
}
