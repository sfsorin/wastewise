import { useStore } from '@store/index';

/**
 * Hook for accessing waste state and actions
 */
export const useWaste = () => {
  const store = useStore();

  return {
    // State
    collections: store.collections,
    loading: store.loading,
    error: store.error,

    // Actions
    fetchCollections: store.fetchCollections,
    addCollection: store.addCollection,
    updateCollection: store.updateCollection,
    deleteCollection: store.deleteCollection,
    getCollectionById: store.getCollectionById,
  };
};
