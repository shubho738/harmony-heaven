
'use client'

import {useSelector} from 'react-redux'

import type {RootState} from '@/redux/store'
import CartPreviewModal from './CartPreviewModal'
import SearchModal from './SearchModal'

const ModalManager = () => {

  const {isCartPreviewModalOpen, isSearchModalOpen, isProfileActionsModalOpen} = useSelector((state: RootState) => state.modal)
  

 if (isCartPreviewModalOpen) return <CartPreviewModal />
 if (isSearchModalOpen) return <SearchModal />

}

export default ModalManager