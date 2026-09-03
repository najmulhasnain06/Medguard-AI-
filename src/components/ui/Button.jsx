/**
 * Reusable Button component.
 * Variants: "primary" (teal), "secondary" (outline), "danger" (red).
 * Sizes: "sm", "md" (default), "lg".
 */
const VARIANT_CLASSES = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  secondary: 'border border-gray-300 text-slate-700 bg-white hover:bg-gray-50 shadow-sm',
  danger:    'bg-danger-500 text-white hover:bg-danger-600 shadow-sm',
  ghost:     'text-slate-600 hover:bg-gray-100',
}

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary}
        ${SIZE_CLASSES[size] || SIZE_CLASSES.md}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
