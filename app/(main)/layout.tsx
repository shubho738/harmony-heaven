
import SiteHeader from '@/components/layouts/SiteHeader'
import SiteFooter from '@/components/layouts/SiteFooter'


const MainLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <>
      <SiteHeader />
      <main
        className="pt-20"
      >
        {children}
      </main>
      <SiteFooter />
    </>
  )
}

export default MainLayout