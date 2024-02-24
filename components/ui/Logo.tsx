
import Link from 'next/link'

import {Music2} from 'lucide-react'

const Logo = () => {

  return (
    <Link
      href="/"
    >
      <div
        className="flex group"
      >
        <Music2 />
      
        <span
          className="font-sans text-sm sm:text-base py-px rounded group-hover:bg-hover-primary transition-colors duration-200"
        >
          HarmonyHeaven
        </span>
      </div>
    </Link>
  )
}

export default Logo