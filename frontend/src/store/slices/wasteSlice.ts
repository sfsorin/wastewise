import { StateCreator } from 'zustand';
import { StoreState } from '..';

// Define waste collection type
export interface WasteCollection {
  id: string;
  address: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  wasteType: 'plastic' | 'paper' | 'glass' | 'metal' | 'organic' | 'mixed';
  quantity: number;
  notes?: string;
}

// Define waste statistics type
export interface WasteStatistics {
  totalCollections: number;
  pendingCollections: number;
  completedCollections: number;
  recyclingRate: number;
  wasteByType: Record<string, number>;
}

// Define the waste slice state and actions
export interface WasteSlice {
  // State
  collections: WasteCollection[];
  statistics: WasteStatistics | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCollections: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
  addCollection: (collection: Omit<WasteCollection, 'id'>) => Promise<boolean>;
  updateCollection: (id: string, updates: Partial<WasteCollection>) => Promise<boolean>;
  deleteCollection: (id: string) => Promise<boolean>;
}

/**
 * Create the waste slice
 */
export const createWasteSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  WasteSlice
> = (set) => ({
  // Initial state
  collections: [],
  statistics: null,
  loading: false,
  error: null,
  
  // Actions
  fetchCollections: async () => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to get waste collections
      const collections: WasteCollection[] = [
        {
          id: '1',
          address: 'Strada Exemplu nr. 1, București',
          date: '2025-05-15T10:00:00',
          status: 'pending',
          wasteType: 'plastic',
          quantity: 25,
          notes: 'Colectare de plastic și PET-uri',
        },
        {
          id: '2',
          address: 'Strada Exemplu nr. 2, București',
          date: '2025-05-12T14:30:00',
          status: 'completed',
          wasteType: 'paper',
          quantity: 15,
          notes: 'Colectare de hârtie și carton',
        },
        {
          id: '3',
          address: 'Strada Exemplu nr. 3, București',
          date: '2025-05-20T09:00:00',
          status: 'pending',
          wasteType: 'glass',
          quantity: 10,
        },
        {
          id: '4',
          address: 'Strada Exemplu nr. 4, București',
          date: '2025-05-10T11:00:00',
          status: 'completed',
          wasteType: 'metal',
          quantity: 30,
        },
        {
          id: '5',
          address: 'Strada Exemplu nr. 5, București',
          date: '2025-05-18T16:00:00',
          status: 'pending',
          wasteType: 'organic',
          quantity: 40,
          notes: 'Deșeuri organice pentru compost',
        },
      ];
      
      set((state) => {
        state.collections = collections;
        state.loading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la încărcarea colectărilor';
        state.loading = false;
      });
    }
  },
  
  fetchStatistics: async () => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to get waste statistics
      const statistics: WasteStatistics = {
        totalCollections: 156,
        pendingCollections: 23,
        completedCollections: 133,
        recyclingRate: 78,
        wasteByType: {
          plastic: 45,
          paper: 30,
          glass: 15,
          metal: 25,
          organic: 35,
          mixed: 6,
        },
      };
      
      set((state) => {
        state.statistics = statistics;
        state.loading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la încărcarea statisticilor';
        state.loading = false;
      });
    }
  },
  
  addCollection: async (collection: Omit<WasteCollection, 'id'>) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to add a waste collection
      const newCollection: WasteCollection = {
        ...collection,
        id: Math.random().toString(36).substring(2, 9),
      };
      
      set((state) => {
        state.collections.push(newCollection);
        state.loading = false;
      });
      
      return true;
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la adăugarea colectării';
        state.loading = false;
      });
      return false;
    }
  },
  
  updateCollection: async (id: string, updates: Partial<WasteCollection>) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to update a waste collection
      set((state) => {
        const index = state.collections.findIndex((c) => c.id === id);
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
      set((state) => {
        state.error = 'Eroare la actualizarea colectării';
        state.loading = false;
      });
      return false;
    }
  },
  
  deleteCollection: async (id: string) => {
    try {
      set((state) => {
        state.loading = true;
        state.error = null;
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to delete a waste collection
      set((state) => {
        state.collections = state.collections.filter((c) => c.id !== id);
        state.loading = false;
      });
      
      return true;
    } catch (error) {
      set((state) => {
        state.error = 'Eroare la ștergerea colectării';
        state.loading = false;
      });
      return false;
    }
  },
});
