export const usePriceCheckerStore = defineStore('priceChecker', {
    state: () => ({
      keywords: '',
      recommended_category: [],
      primary_categories: [],
      selected_category: {},
      aspects: [],
      current_ebay_url: ''
    }),
  })