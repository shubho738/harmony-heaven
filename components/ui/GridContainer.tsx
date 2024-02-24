
import {cn} from '@/libs/utils'

interface GridContainerProps {
  children: React.ReactNode;
  customStyles?: string;
}

const GridContainer = ({children, customStyles}: GridContainerProps) => {

  return (
    <div
      className={cn(
        `
          grid grid-auto-fit-[15rem] gap-x-8 gap-y-12
        `,
        customStyles
        )}
    >
        {children}
    </div>
  )
}

export default GridContainer