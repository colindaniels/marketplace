<template>
    <div>
        <Section v-if="sidebar_index == 0" title="Dashboard">
            test
        </Section>
        <Section v-if="sidebar_index == 1" title="Price Checker">
            <PriceChecker></PriceChecker>
        </Section>
        <Section v-if="sidebar_index == 2" title="Saved Searches">
            <SavedSearches></SavedSearches>
        </Section>
    </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const sidebar_index = computed(() => useMenuStore().sidebar)

</script>


<style scoped>

</style>