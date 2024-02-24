
import Image from 'next/image'

import type {HomeHeroBanner} from '@/libs/types'
import fetchHomeHeroBanner from '@/dataFetch/fetchHomeHeroBanner'
import {homeHeroBannerFallbackData} from '@/config/site'
import Button from '../ui/Button'

const HomeHero =  async () => {

  let bannerData: HomeHeroBanner | undefined

  try {

    bannerData = await fetchHomeHeroBanner()

    if (
      !bannerData ||
      !bannerData.description ||
      !bannerData.desktopImageUrl ||
      !bannerData.mobileImageUrl ||
      !bannerData.ctaHref
    ) bannerData = homeHeroBannerFallbackData

  }

  catch(err) {
    bannerData = homeHeroBannerFallbackData
  }


  const desktopImageStyle = {
    '--desktop-image': `url(${bannerData?.desktopImageUrl})`,
  } as React.CSSProperties


  return (
    <section
      className="py-6"
    >
      <div className="container">

        <div
          style={desktopImageStyle}
          className={`md:min-h-[30rem] md:bg-[image:var(--desktop-image)] bg-cover bg-center flex flex-col md:justify-center md:items-end gap-4 md:pr-16`}
        >

          <div
            className="relative h-96 md:hidden"
          >
            <Image
              fill
              src={bannerData?.mobileImageUrl}
              alt="home hero banner image"
              style={{objectFit: "cover"}}
            />
          </div>

          <div
            className="md:max-w-[32rem] md:bg-neutral-light md:px-2 md:py-2"
          >
            <h1
              className="md:text-[black] text-xl md:text-2xl leading-8 md:leading-9"
            >
              {bannerData?.description}
            </h1>
          </div>

          <Button
            label="Shop Now"
            href={bannerData?.ctaHref}
          />
        </div>
      </div>
    </section>
  )
}

export default HomeHero