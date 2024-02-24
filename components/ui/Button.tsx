
'use client'

import Link from 'next/link'
import {ClipLoader} from 'react-spinners'

import type {IconType} from '@/libs/types'
import {cn} from '@/libs/utils'

interface ButtonProps {

  label?: string;
  icon?: IconType;
  href?: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
  isLoading?: boolean;
  customStyles?: string;
  loaderColor?: string;
}

const Button = ({label, icon: Icon, href, onClick, disabled, isLoading, customStyles, loaderColor}: ButtonProps) => {


  if (href) {

    return (
      <Link
        href={href}
      >
        <button
          className={cn(
            `
              bg-btn-primary text-btn-primary-text text-sm py-2 px-4 border-none rounded hover:opacity-90
            `,
            customStyles
            )} 
        >
          {label ? label : (Icon && <Icon size={20} />)}
        </button>
      </Link>
      )
  }


  return (
   <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
          bg-btn-primary text-btn-primary-text text-sm py-2 px-4 border-none rounded hover:opacity-90 disabled:cursor-not-allowed flex gap-2 items-center
        `,
        customStyles
        )}
    >
      {isLoading && (
         <ClipLoader
            size={16}
            color={loaderColor ?? "hsl(var(--clr-btn-primary-loader))"}
          />
        )}

      {label ? label : (Icon && <Icon size={20} />)}
      
    </button>
  )
}

export default Button