<template>
    <div class="flex-col gap-40" v-if="!pending">
        <div class="flex-col gap-20">
            <SlideBtn @selected="selectCategory" unique name="Reccommended Category" :data="usePriceCheckerStore().recommended_category" :current_value="usePriceCheckerStore().selected_category" />
            <SlideBtn @selected="selectCategory" unique name="Silimar Categories" :data="usePriceCheckerStore().primary_categories" :current_value="usePriceCheckerStore().selected_category" />
        </div>
        <Btn @click="$emit('nextStep')" :inactive="categoriesEmpty" class=" left-auto right-auto">Continue</Btn>
    </div>
    <div v-else>LOADING...</div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
function selectCategory(name: string, d: any) {
    usePriceCheckerStore().selected_category = d
}

const localKeywords = computed(() => usePriceCheckerStore().keywords)
const { data, pending } = useFetch('/api/getCategories', { params: { keywords: localKeywords } })

watch(data, () => {
    usePriceCheckerStore().recommended_category = data.value.recommended_category
    usePriceCheckerStore().primary_categories = data.value.primary_categories
})

const categoriesEmpty = computed(() => Object.values(usePriceCheckerStore().selected_category).every(innerArr => innerArr.length === 0))

</script>

<style scoped lang="scss"></style>