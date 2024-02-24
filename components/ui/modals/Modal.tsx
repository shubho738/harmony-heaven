
import { useEffect } from 'react'
import {X} from 'lucide-react'

import {cn} from '@/libs/utils'

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  onClose(e?: React.MouseEvent): void;
  customOverlayStyles?: string;
  customStyles?: string;
  customBodyStyles?: string;
}

const Modal = ({children, title, onClose, customOverlayStyles, customStyles, customBodyStyles}: ModalProps) => {

  useEffect(() => {
  
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])


  return (
   <div
     className={cn(
        `
          fixed z-20 inset-0 pt-8 px-1 bg-neutral-light/40 backdrop-blur
        `,
        customOverlayStyles
        )}
    >
    <div
      className={cn(
        `
          w-full max-w-xl mx-auto border border-border-light
        `,
        customStyles
        )}
    >
      <header
        className="flex justify-between items-center bg-accent-secondary text-neutral-light py-3 px-3"
      >
        <h2>{title}</h2>

        <X
          onClick={onClose}
          className="cursor-pointer hover:opacity-70"
        />
      </header>

      <div
        className={cn(
          `
            bg-neutral-light pt-6 pb-8 px-4 xs:px-6 max-h-[27rem] overflow-y-scroll
          `,
          customBodyStyles
          )}
      >
        {children}
      </div>
    </div>
   </div>
  )
}

export default Modal