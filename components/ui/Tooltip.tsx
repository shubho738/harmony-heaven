
import {cn} from '@/libs/utils'

interface TooltipProps {

  text: string;
  children: React.ReactNode;
  customStyles?: string;
}

const Tooltip = ({ text, children, customStyles }: TooltipProps) => {

  return (

    <div 
      className="relative group"
    >
    
      {children}

      <div 
        className={cn(
          `
            absolute top-[25%] -right-[160%] z-10 px-1 py-1 bg-tooltip-bg text-tooltip-text text-xs rounded hidden group-hover:block
          `,
          customStyles
          )}
      >
        {text}
      </div>
    </div>
  )
}

export default Tooltip