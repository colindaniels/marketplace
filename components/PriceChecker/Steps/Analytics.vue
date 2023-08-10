<template>
    <div>
        <AnalyticsCard v-if="!pending" :title="data?.search_query" :total_results="data?.total_results" :category="usePriceCheckerStore().selected_category.name" :listings="data.items"/>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const { data, pending } = useFetch('/api/getSoldEbayData', { params: { ebay_url: usePriceCheckerStore().current_ebay_url } })


watch(data, () => {
    console.log(data.value)
})
</script>

<style scoped>

</style>