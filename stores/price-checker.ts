export const usePriceCheckerStore = defineStore('priceChecker', {
    state: () => ({
      keywords: '',
      recommended_category: [],
      primary_categories: [],
      selected_category: {},
      aspects: [],
      selected_aspects: []
    }),
  })