import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearAll: () => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id: string) => {
        set((state) => ({
          favorites: [...new Set([...state.favorites, id])],
        }));
      },
      removeFavorite: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        }));
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
      clearAll: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'startupvault-favorites',
    }
  )
);
