import React from 'react'
import { cn } from '@/utils/cn'

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'default' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-16 h-12',
  md: 'w-24 h-18',
  lg: 'w-32 h-24',
  xl: 'w-40 h-30',
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const fillColor = variant === 'light' 
    ? 'fill-white' 
    : variant === 'dark' 
    ? 'fill-neutral-900 dark:fill-white' 
    : 'fill-white'

  return (
    <svg
      width="92"
      height="70"
      viewBox="0 0 92 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeMap[size], fillColor, className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.0121 4.88998L61.1256 0.695557L64.2391 4.88999L79.9978 26.12H73.7709L61.1256 9.08441L40.3915 37.0172H81.8597L77.4823 31.12H83.7093L88.0867 37.0172L91.7981 42.0172H85.5712H36.6801H30.4531L34.1646 37.0172L58.0121 4.88998Z"
        className={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.7859 65.1965L30.6725 69.3909L27.559 65.1965L11.8001 43.9663H18.0271L30.6725 61.0021L51.4066 33.0693H9.93837L14.3156 38.9663H8.08869L3.71143 33.0693L0 28.0693H6.22694H55.118H61.345L57.6335 33.0693L33.7859 65.1965Z"
        className={fillColor}
      />
    </svg>
  )
}

Logo.displayName = 'Logo'
