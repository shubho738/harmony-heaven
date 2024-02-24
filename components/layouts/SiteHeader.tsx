
import Link from 'next/link'

import type {Category} from '@/libs/types'
import {siteConfig} from '@/config/site'
import fetchNavCategories from '@/dataFetch/fetchNavCategories'
import Logo from '../ui/Logo'
import Search from '../ui/Search'
import CartPreview from '../ui/CartPreview'
import ProfileIcon from '../ui/ProfileIcon'
import MobileMenu from '../ui/MobileMenu'

const SiteHeader = async () => {

  let categories: Category[] | undefined

  try {
    categories = await fetchNavCategories()
  }

  catch(err) {
    categories = siteConfig.headerNav
  }

  return (
    <header className="fixed top-0 w-full z-10 bg-background py-6 border-b border-border-light">
      <div className="container">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-12"
          >
            <Logo />

            <nav className="hidden md:block">
              <ul className="flex gap-12">
                {categories?.map((category) => (
                  <Link
                    key={category?.id}
                    href={`/categories/${category?.name}`}
                    className="hover:underline"
                  >
                    <li>{category?.name}</li>
                  </Link>
                ))}
              </ul>
            </nav>

          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Search />
            <CartPreview />
            <ProfileIcon />
        
            <MobileMenu
              navItems={categories} 
            />
          </div>

        </div>

      </div>
    </header>
  )
}

export default SiteHeader
