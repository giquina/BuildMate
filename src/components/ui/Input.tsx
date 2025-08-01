import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'floating' | 'minimal' | 'tesla'
  state?: 'default' | 'success' | 'warning' | 'error'
  loading?: boolean
}

export function Input({ 
  className, 
  label, 
  error, 
  helperText, 
  leftIcon,
  rightIcon,
  variant = 'default',
  state = 'default',
  loading = false,
  id, 
  placeholder,
  value,
  ...props 
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id || generatedId
  const [focused, setFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(!!value || !!props.defaultValue)

  React.useEffect(() => {
    setHasValue(!!value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  // Determine the actual state
  const actualState = error ? 'error' : state

  const stateStyles = {
    default: {
      border: "border-slate-300 focus:border-tesla-500",
      ring: "focus:ring-tesla-500/20",
      text: "text-slate-900"
    },
    success: {
      border: "border-success-300 focus:border-success-500",
      ring: "focus:ring-success-500/20",
      text: "text-slate-900"
    },
    warning: {
      border: "border-warning-300 focus:border-warning-500",
      ring: "focus:ring-warning-500/20",
      text: "text-slate-900"
    },
    error: {
      border: "border-error-300 focus:border-error-500",
      ring: "focus:ring-error-500/20",
      text: "text-slate-900"
    }
  }

  const baseInputStyles = cn(
    "block w-full rounded-lg border bg-white px-4 py-3 text-base transition-all duration-200",
    "focus:outline-none focus:ring-4",
    "placeholder:text-slate-400",
    "disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
    stateStyles[actualState].border,
    stateStyles[actualState].ring,
    stateStyles[actualState].text
  )

  if (variant === 'floating') {
    return (
      <div className="relative">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              baseInputStyles,
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              "peer",
              className
            )}
            placeholder=" "
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            {...props}
          />
          {rightIcon && !loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-tesla-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400",
                "peer-focus:top-2 peer-focus:text-xs peer-focus:text-tesla-600 peer-focus:-translate-y-0",
                (hasValue || focused) && "top-2 text-xs text-tesla-600 -translate-y-0",
                leftIcon && "peer-placeholder-shown:left-10 peer-focus:left-4",
                leftIcon && (hasValue || focused) && "left-4"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {(error || helperText) && (
          <div className="mt-2 text-sm">
            {error && (
              <p className="text-error-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-slate-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className="relative">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              "block w-full border-0 border-b-2 bg-transparent px-0 py-2 text-base transition-colors",
              "focus:outline-none focus:ring-0",
              "placeholder:text-slate-400",
              leftIcon && "pl-8",
              rightIcon && "pr-8",
              stateStyles[actualState].border.replace('border-', 'border-b-').replace('focus:border-', 'focus:border-b-'),
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {rightIcon && !loading && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
          {loading && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-tesla-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className="mt-2 text-sm">
            {error && <p className="text-error-600">{error}</p>}
            {helperText && !error && <p className="text-slate-500">{helperText}</p>}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'tesla') {
    return (
      <div className="relative group">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-slate-900 mb-3">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-tesla-600 transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              "block w-full rounded-xl border-2 bg-white px-5 py-4 text-base font-medium transition-all duration-300",
              "focus:outline-none focus:ring-4 focus:scale-[1.02]",
              "placeholder:text-slate-400 placeholder:font-normal",
              "shadow-sm hover:shadow-md focus:shadow-tesla",
              leftIcon && "pl-12",
              rightIcon && "pr-12",
              stateStyles[actualState].border,
              stateStyles[actualState].ring,
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {rightIcon && !loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-tesla-600 transition-colors">
              {rightIcon}
            </div>
          )}
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-tesla-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className="mt-3 text-sm">
            {error && (
              <p className="text-error-600 flex items-center gap-2 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-slate-600">{helperText}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            baseInputStyles,
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {rightIcon && !loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-tesla-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      {(error || helperText) && (
        <div className="text-sm">
          {error && <p className="text-error-600">{error}</p>}
          {helperText && !error && <p className="text-slate-500">{helperText}</p>}
        </div>
      )}
    </div>
  )
}

// Textarea component with similar styling
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'tesla'
  state?: 'default' | 'success' | 'warning' | 'error'
}

export function Textarea({ 
  className, 
  label, 
  error, 
  helperText, 
  variant = 'default',
  state = 'default',
  id, 
  ...props 
}: TextareaProps) {
  const generatedTextareaId = React.useId()
  const textareaId = id || generatedTextareaId
  const actualState = error ? 'error' : state

  const stateStyles = {
    default: {
      border: "border-slate-300 focus:border-tesla-500",
      ring: "focus:ring-tesla-500/20"
    },
    success: {
      border: "border-success-300 focus:border-success-500",
      ring: "focus:ring-success-500/20"
    },
    warning: {
      border: "border-warning-300 focus:border-warning-500",
      ring: "focus:ring-warning-500/20"
    },
    error: {
      border: "border-error-300 focus:border-error-500",
      ring: "focus:ring-error-500/20"
    }
  }

  const baseStyles = cn(
    "block w-full rounded-lg border bg-white px-4 py-3 text-base transition-all duration-200",
    "focus:outline-none focus:ring-4",
    "placeholder:text-slate-400 resize-vertical",
    "disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
    stateStyles[actualState].border,
    stateStyles[actualState].ring
  )

  if (variant === 'tesla') {
    return (
      <div className="space-y-3">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-semibold text-slate-900">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "block w-full rounded-xl border-2 bg-white px-5 py-4 text-base font-medium transition-all duration-300",
            "focus:outline-none focus:ring-4 focus:scale-[1.01]",
            "placeholder:text-slate-400 placeholder:font-normal",
            "shadow-sm hover:shadow-md focus:shadow-tesla",
            "resize-vertical min-h-[120px]",
            stateStyles[actualState].border,
            stateStyles[actualState].ring,
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <p className="text-error-600 flex items-center gap-2 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-slate-600">{helperText}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(baseStyles, "min-h-[120px]", className)}
        {...props}
      />
      {(error || helperText) && (
        <div className="text-sm">
          {error && <p className="text-error-600">{error}</p>}
          {helperText && !error && <p className="text-slate-500">{helperText}</p>}
        </div>
      )}
    </div>
  )
}