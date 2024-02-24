
export const siteConfig = {
  title: "HarmonyHeaven",

  description:
    "Discover your harmony at harmony-heaven.com - Explore a symphony of musical instruments, from guitars to keyboards. Find your rhythm with our curated collection and create beautiful melodies. Shop now for top-quality instruments and accessories!",
  
  footerNav: [
    {
      id: "info-section",
      label: "Information",
      items: [
        { id: "about-us", label: "About Us", href: "/about-us", isExternal: false },
        { id: "privacy-policy", label: "Privacy Policy", href: "/privacy-policy", isExternal: false },
        { id: "warranty", label: "Warranty", href: "/warranty", isExternal: false },
        { id: "reward-program", label: "Reward Program", href: "/reward-program", isExternal: false }
      ]
    },
    {
      id: "instrument-section",
      label: "Shop by Instrument",
      items: [
        { id: "guitars", label: "Guitars", href: "/categories/guitars", isExternal: false },
        { id: "keyboards", label: "Pianos & Keyboards", href: "/categories/keyboards", isExternal: false },
        { id: "violins", label: "Violins", href: "/categories/violins", isExternal: false },
        { id: "sarod", label: "Sarod", href: "/categories/sarod", isExternal: false },
        { id: "tabla", label: "Tabla", href: "/categories/tabla", isExternal: false },
        { id: "flutes", label: "Flutes", href: "/categories/flutes", isExternal: false }
      ]
    },
    {
      id: "customer-service-section",
      label: "Customer Service",
      items: [
        { id: "contact-us", label: "Contact Us", href: "/contact-us", isExternal: false },
        { id: "shipping-info", label: "Shipping Information", href: "/shipping-info", isExternal: false },
        { id: "returns-exchanges", label: "Returns & Exchanges", href: "/returns-exchanges", isExternal: false },
        { id: "faqs", label: "FAQs", href: "/faqs", isExternal: false },
        { id: "product-support", label: "Product Support", href: "/product-support", isExternal: false }
      ]
    },
    {
      id: "connect-section",
      label: "Connect with Us",
      items: [
        { id: "twitter", label: "Twitter", href: "https://twitter.com/your-twitter-account", isExternal: true },
        { id: "github", label: "GitHub", href: "https://github.com/your-github-account", isExternal: true },
        { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/your-linkedin-account", isExternal: true },
        { id: "newsletter", label: "Newsletter", href: "/newsletter", isExternal: false },
        { id: "events", label: "Events", href: "/events", isExternal: false },
        { id: "testimonials", label: "Testimonials", href: "/testimonials", isExternal: false }
      ]
    }
  ],

  headerNav: [
    {id: "keyboards" ,name: "keyboards"},
    {id: "drums" ,name: "drums"},
    {id: "accordions" ,name: "accordions"}
  ],

}



export const homeHeroBannerFallbackData = {

  description: "Explore our curated collection of refurbished instruments for an enriched musical experience.",
  desktopImageUrl: "/banner-desktop.jpg",
  mobileImageUrl: "/banner-mobile.jpg",
  ctaHref: "/categories/refurbished"
}



export const productSwitcherTabs = ["trending", "popular"]
