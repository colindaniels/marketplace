<template>
    <div class="flex-col gap-40">
        <div class="flex-col gap-20">
            <SlideBtn @selected="selectCategory" type="unique" name="Reccommended Category" :values="reccommended_category" :current_value="usePriceCheckerStore().category" />
            <SlideBtn @selected="selectCategory" type="unique" name="Silimar Categories" :values="similar_categories" :current_value="usePriceCheckerStore().category" />
        </div>
        <Btn @click="$emit('nextStep')" :inactive="!usePriceCheckerStore().category" class=" left-auto right-auto">Continue
        </Btn>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const reccommended_category = ref(['Cellphones & Smartphones'])
const similar_categories = ref(['Cellphone Accessories', 'Cellphone & Smartphone parts', 'Another Example'])
function selectCategory(name: string, value: any) {
    usePriceCheckerStore().category = value
}

</script>

<style scoped lang="scss"></style>