
import { createSlice } from '@reduxjs/toolkit'

export interface  modalState {
  isCartPreviewModalOpen: boolean;
  isSearchModalOpen: boolean;
  isProfileActionsModalOpen: boolean;
}

const initialState: modalState = {
  isCartPreviewModalOpen: false,
  isSearchModalOpen: false,
  isProfileActionsModalOpen: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCartPreviewModal: (state) => {
      state.isCartPreviewModalOpen = true
    },
    closeCartPreviewModal: (state) => {
      state.isCartPreviewModalOpen = false
    },

    openSearchModal: (state) => {
      state.isSearchModalOpen = true
    },
    closeSearchModal: (state) => {
      state.isSearchModalOpen = false
    },

    openProfileActionsModal: (state) => {
      state.isProfileActionsModalOpen = true
    },
    closeProfileActionsModal: (state) => {
      state.isProfileActionsModalOpen = false
    }
  },
})

export const { openCartPreviewModal, closeCartPreviewModal, openSearchModal, closeSearchModal, openProfileActionsModal, closeProfileActionsModal} = modalSlice.actions

export default modalSlice.reducer