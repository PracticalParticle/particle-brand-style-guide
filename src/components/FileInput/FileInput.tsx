import React from 'react'
import { cn } from '@/utils/cn'

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  /** Placeholder text in drop zone when no file. */
  placeholder?: string
  /** e.g. "image/*", ".pdf", "image/*,.pdf" */
  accept?: string
  multiple?: boolean
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = false,
      placeholder = 'Choose file or drag and drop',
      id,
      accept,
      multiple,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || `file-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error
    const [files, setFiles] = React.useState<FileList | null>(null)
    const [drag, setDrag] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFiles(e.target.files)
      onChange?.(e)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setDrag(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDrag(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDrag(false)
      if (disabled) return
      const input = e.currentTarget.querySelector('input')
      if (input && e.dataTransfer.files.length) {
        const dt = new DataTransfer()
        for (let i = 0; i < e.dataTransfer.files.length; i++) dt.items.add(e.dataTransfer.files[i])
        input.files = dt.files
        setFiles(dt.files)
        onChange?.({ target: input } as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const fileNames = files ? Array.from(files).map((f) => f.name).join(', ') : null

    return (
      <div className={cn('flex flex-col space-y-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-tight text-text-primary"
          >
            {label}
            {props.required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <label
          htmlFor={inputId}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative flex min-h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-secondary px-4 py-6 text-center transition-colors border-neutral-400 dark:border-neutral-500',
            drag && !disabled && 'border-tertiary bg-tertiary/5',
            hasError && 'border-error focus-within:border-error',
            !hasError && !disabled && 'hover:border-neutral-500 dark:hover:border-neutral-400 focus-within:border-primary',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <input
            ref={ref}
            type="file"
            id={inputId}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className="absolute inset-0 z-0 cursor-pointer opacity-0 file:pointer-events-none"
            {...props}
          />
          <span className={cn('relative z-10 text-sm', fileNames ? 'text-text-secondary' : 'text-text-tertiary')}>
            {fileNames || placeholder}
          </span>
          {accept && (
            <span className="mt-1 text-xs text-text-tertiary">
              {accept}
            </span>
          )}
        </label>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'
