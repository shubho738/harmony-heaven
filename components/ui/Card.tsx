
import {cn} from '@/libs/utils'


interface CardProps {
  children: React.ReactNode;
  customStyles?: string;
}

const Card = ({children, customStyles}: CardProps) => {

  return (
    <div
      className={cn(
        `
          bg-neutral-light py-4 px-4 border rounded hover:shadow-lg shadow-foreground
        `,
        customStyles
        )}
    >
      {children}
    </div>
  )
}

export default Card