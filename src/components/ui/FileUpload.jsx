import { useRef, useState } from 'react'
import { Upload, Image, X } from 'lucide-react'

/**
 * Drag-and-drop file upload component for medicine packaging photos.
 * Calls onFileSelect(file) when the user picks or drops an image.
 */
export default function FileUpload({ onFileSelect }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    setFileName(file.name)
    // Create a preview URL for the selected image
    const url = URL.createObjectURL(file)
    setPreview(url)
    onFileSelect?.(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  function clearSelection() {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFileName(null)
    if (inputRef.current) inputRef.current.value = ''
    onFileSelect?.(null)
  }

  return (
    <div>
      {/* Drop zone */}
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-10
            flex flex-col items-center justify-center gap-3
            cursor-pointer transition-all duration-200
            ${dragOver
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }
          `}
        >
          <Upload className={`w-10 h-10 ${dragOver ? 'text-primary-500' : 'text-gray-400'}`} />
          <p className="text-slate-600 font-medium">
            Drag and drop a photo here, or <span className="text-primary-600">click to browse</span>
          </p>
          <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP</p>
        </div>
      ) : (
        /* Preview after selection */
        <div className="relative border border-gray-200 rounded-xl overflow-hidden">
          <img
            src={preview}
            alt="Selected medicine packaging"
            className="w-full max-h-64 object-contain bg-gray-100"
          />
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Image className="w-4 h-4" />
              <span className="truncate max-w-xs">{fileName}</span>
            </div>
            <button
              onClick={clearSelection}
              className="p-1 rounded-full hover:bg-gray-100 text-slate-400 hover:text-slate-600"
              aria-label="Remove selected image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  )
}
