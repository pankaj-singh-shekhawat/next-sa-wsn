import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  profile : null,
  logout : () => {
    set((state) => ({ 
        isLoggedIn : false,
        profile : null
    }))
  },
  setProfile : (profiledata) => {
    set((state) => ({ 
        isLoggedIn : true,
        profile : profiledata
    }))
  }
}))