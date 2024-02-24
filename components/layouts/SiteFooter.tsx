
import Link from 'next/link'

import {siteConfig} from '@/config/site'

const SiteFooter = () => {

  return (
    <footer
      className="border-t border-border-light pt-8 pb-12"
    >
      <div
        className="container"
      >
        <div
          className="grid grid-auto-fit-sm gap-y-8 gap-x-4"
        >
          {siteConfig?.footerNav?.map(nav => (
            <div
              key={nav?.id}
              className="space-y-4"
            >
              <h2
                className="text-lg font-semibold"
              >
                {nav?.label}
              </h2>

              <ul
                className="grid gap-4 justify-start"
              >
                {nav?.items?.map(link => (
                  <Link
                    key={link?.id}
                    href={link?.href}
                    target={link?.isExternal ? "_blank" : ""}
                    className="text-sm hover:text-hover-secondary"
                  >
                    <li
                      key={link?.label}
                    >
                      {link?.label}
                    </li>
                  </Link>
                  ))}
              </ul>
            </div>
            ))}
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter