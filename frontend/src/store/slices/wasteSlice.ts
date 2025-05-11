import { type StateCreator } from 'zustand';
import { type StoreState } from '../types';

// Define waste collection type
export interface WasteCollection {
  id: string;
  type: 'plastic' | 'paper' | 'glass' | 'metal' | 'electronic' | 'organic' | 'mixed';
  quantity: number; // in kg
  date: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  address: string;
  notes?: string;
  userId: string;
}

// Define the waste slice state and actions
export interface WasteSlice {
  // State
  collections: WasteCollection[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchCollections: () => Promise<void>;
  addCollection: (collection: Omit<WasteCollection, 'id'>) => Promise<string | null>;
  updateCollection: (id: string, updates: Partial<WasteCollection>) => Promise<boolean>;
  deleteCollection: (id: string) => Promise<boolean>;
  getCollectionById: (id: string) => WasteCollection | undefined;
}

/**
 * Create the waste slice
 */
export const createWasteSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  WasteSlice
> = (set, get) => ({
  // Initial state
  collections: [],
  loading: false,
  error: null,

  // Actions
  fetchCollections: async () => {
    try {
      set(state => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock collections data
      const mockCollections: WasteCollection[] = [
        {
          id: '1',
          type: 'plastic',
          quantity: 5.2,
          date: '2023-05-15T10:00:00Z',
          status: 'completed',
          address: 'Strada Exemplu 123, București',
          notes: 'Plastic bottles and containers',
          userId: '1',
        },
        {
          id: '2',
          type: 'paper',
          quantity: 3.8,
          date: '2023-05-20T14:30:00Z',
          status: 'completed',
          address: 'Strada Exemplu 123, București',
          notes: 'Newspapers and cardboard',
          userId: '1',
        },
        {
          id: '3',
          type: 'glass',
          quantity: 7.5,
          date: '2023-05-25T09:00:00Z',
          status: 'scheduled',
          address: 'Strada Exemplu 123, București',
          userId: '1',
        },
        {
          id: '4',
          type: 'electronic',
          quantity: 12.3,
          date: '2023-06-05T11:00:00Z',
          status: 'pending',
          address: 'Strada Exemplu 123, București',
          notes: 'Old computer and peripherals',
          userId: '1',
        },
      ];

      set(state => {
        state.collections = mockCollections;
        state.loading = false;
      });
    } catch (error) {
      set(state => {
        state.error = 'Eroare la încărcarea colectărilor';
        state.loading = false;
      });
    }
  },

  addCollection: async (collection: Omit<WasteCollection, 'id'>) => {
    try {
      set(state => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a random ID
      const id = Math.random().toString(36).substring(2, 9);

      set(state => {
        state.collections.push({
          ...collection,
          id,
        });
        state.loading = false;
      });

      return id;
    } catch (error) {
      set(state => {
        state.error = 'Eroare la adăugarea colectării';
        state.loading = false;
      });
      return null;
    }
  },

  updateCollection: async (id: string, updates: Partial<WasteCollection>) => {
    try {
      set(state => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      set(state => {
        const index = state.collections.findIndex(c => c.id === id);
        if (index !== -1) {
          state.collections[index] = {
            ...state.collections[index],
            ...updates,
          };
        }
        state.loading = false;
      });

      return true;
    } catch (error) {
      set(state => {
        state.error = 'Eroare la actualizarea colectării';
        state.loading = false;
      });
      return false;
    }
  },

  deleteCollection: async (id: string) => {
    try {
      set(state => {
        state.loading = true;
        state.error = null;
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      set(state => {
        state.collections = state.collections.filter(c => c.id !== id);
        state.loading = false;
      });

      return true;
    } catch (error) {
      set(state => {
        state.error = 'Eroare la ștergerea colectării';
        state.loading = false;
      });
      return false;
    }
  },

  getCollectionById: (id: string) => {
    return get().collections.find(c => c.id === id);
  },
});
