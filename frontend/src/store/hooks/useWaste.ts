import { useStore } from '..';
import { WasteCollection } from '../slices/wasteSlice';

/**
 * Custom hook for waste-related state and actions
 */
export const useWaste = () => {
  const store = useStore();
  
  return {
    // State
    collections: store.collections,
    statistics: store.statistics,
    loading: store.loading,
    error: store.error,
    
    // Actions
    fetchCollections: store.fetchCollections,
    fetchStatistics: store.fetchStatistics,
    addCollection: store.addCollection,
    updateCollection: store.updateCollection,
    deleteCollection: store.deleteCollection,
  };
};

export default useWaste;
