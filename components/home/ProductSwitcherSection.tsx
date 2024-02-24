
'use client'

import {useState, useEffect} from 'react'
import {ClipLoader} from 'react-spinners'

import type { Product } from '@/libs/types'
import {productSwitcherTabs} from '@/config/site'
import shuffleArray from '@/libs/helpers/shuffleArray'
import useProductsByType from '@/hooks/useProductsByType'
import ErrorMsg from '../ui/ErrorMsg'
import ProductCard from '../ui/ProductCard'
import GridContainer from '../ui/GridContainer'
import SectionBase from '../layouts/SectionBase'


interface TabTileProps {
  tabname: string;
  onSelect(): void;
  currentTab: string;
}

const TabTile = ({tabname, onSelect, currentTab}: TabTileProps) => {

  return (
    <div
      onClick={onSelect}
      className={`bg-neutral-light py-1 px-2 rounded-sm hover:-translate-y-1 transition cursor-pointer ${tabname === currentTab ? "bg-neutral-md text-neutral-light" : ""}`}
    >
      <span>{tabname}</span>
    </div>
    )
}


const ProductSwitcherSection = () => {

  const [selectedTab, setSelectedTab] = useState('trending')
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([])
  

  const {data: selectedProducts, isLoading: isLoadingProducts, error: errorProducts}: {data: Product[] | undefined, isLoading: boolean; error: any;} = useProductsByType(selectedTab)


  useEffect(() => {
    
    if (selectedProducts && selectedProducts.length > 0 && shuffledProducts.length === 0) {
      setShuffledProducts(shuffleArray(selectedProducts))
    }
  }, [selectedProducts, shuffledProducts])


  const onTabSelect = (tabname: string) => setSelectedTab(tabname)


  return (
    <SectionBase>
      <h2
        className="text-2xl font-semibold"
      >
        Top Products
      </h2>

      <div
        className="space-y-8"
      >

        <div
          className="flex justify-center gap-4"
        >
          {productSwitcherTabs?.map(tab => (
            <TabTile
              key={tab}
              tabname={tab}
              onSelect={() => onTabSelect(tab)}
              currentTab={selectedTab}
            />
            ))}
        </div>


        {isLoadingProducts ? (
          <div
            className="text-center"
          >
            <ClipLoader />
          </div> 
          ) : (
            <>
              {errorProducts ? (
                <ErrorMsg />
              ) : (
                <GridContainer>
                  {selectedProducts?.map((product) => (
                    <div key={product?.id} className="w-full max-w-[22rem] mx-auto">
                      <ProductCard product={product} customStyles="px-0 py-0" />
                    </div>
                  ))}
                </GridContainer>
              )}
            </>
          )}
      </div>
    </SectionBase>
  )
}

export default ProductSwitcherSection