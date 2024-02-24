
import {cn} from '@/libs/utils'

interface SectionBaseProps {
  children: React.ReactNode;
  customStyles?: string;
}

const SectionBase = ({children, customStyles}: SectionBaseProps) => {

  return (
    <section
      className={cn(
        `
          py-24
        `,
        customStyles
        )}
    >
      <div 
        className="container"
      >
        <div
          className="space-y-12"
        >

          {children}

        </div>
      </div>
    </section>
  )
}

export default SectionBase