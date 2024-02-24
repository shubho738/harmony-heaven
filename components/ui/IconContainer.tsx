
import type {IconType} from '@/libs/types'
import {cn} from '@/libs/utils'
import Tooltip from './Tooltip'

interface IconContainerProps {
  icon: IconType;
  color?: string;
  size?: number;
  customStyles?: string;
  tooltipText?: string;
  customTooltipStyles?: string;
}


const IconContainer = ({icon: Icon, color, size, customStyles, tooltipText, customTooltipStyles}: IconContainerProps) => {


  if (tooltipText) {

    return (
     <Tooltip
       text={tooltipText}
       customStyles={customTooltipStyles}
     >
      <div
        className={cn(
          `
            cursor-pointer border border-border-md rounded-md py-1 px-1 hover:bg-hover-primary
          `,
          customStyles
          )}
      >
        <Icon
          color={color}
          size={size}
        />
      </div>
     </Tooltip>
    )
  }


  return (
    <div
      className={cn(
        `
          cursor-pointer border border-border-md rounded-md py-1 px-1 hover:bg-neutral-light
        `,
        customStyles
        )}
    >
      <Icon
        color={color}
        size={size}
      />
    </div>
    )

}

export default IconContainer