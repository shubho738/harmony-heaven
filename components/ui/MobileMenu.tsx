
'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Menu, X} from 'lucide-react'

import type {Category} from '@/libs/types'

interface MobileMenuProps {
  navItems: Category[];
}

const MobileMenu = ({navItems}: MobileMenuProps) => {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div
      onClick={() => setIsOpen(true)}
      className="md:hidden"
    >
      {!isOpen && <Menu />}

      {isOpen && (
        <nav
          className="fixed inset-0 z-100 bg-neutral-md"
        >
         <div
           className="w-[70%] h-full px-8 py-8 bg-neutral-light"
         >

          <div
            onClick={(e) => {e.stopPropagation(); setIsOpen(false)}}
            className="inline-block"
          >
            <X />
          </div>

          <ul
            className="flex flex-col gap-12 py-16"
          >

            {navItems?.map(item => (
              <Link
                onClick={(e) => {e.stopPropagation(); setIsOpen(false)}}
                key={item?.id}
                href={`/categories/${item?.name}`}
              >
                <li>
                  {item?.name}
                </li>
              </Link>
              ))}
           </ul>
          </div>
        </nav>
        )}
    </div>
  )
}

export default MobileMenu