<template>
    <div class="flex-col gap-40">
        <div class="flex-col gap-20">
            <div class="flex-col gap-10">
                <h5 class="weight-semi-bold">Reccommended Category</h5>
                <SlideBtn @selected="selectCategory" type="unique" :values="reccommended_category" :current_value="usePriceCheckerStore().category"/>
            </div>
            <div class="flex-col gap-10">
                <h5 class="weight-semi-bold">Similar Category</h5>
                <SlideBtn @selected="selectCategory" type="unique" :values="similar_categories" :current_value="usePriceCheckerStore().category" />
            </div>
        </div>
        <Btn @click="$emit('nextStep')" :inactive="!usePriceCheckerStore().category" class=" left-auto right-auto">Continue</Btn>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const reccommended_category = ref(['Cellphones & Smartphones'])
const similar_categories = ref(['Cellphone Accessories', 'Cellphone & Smartphone parts', 'Another Example'])
function selectCategory(category: any) {
    usePriceCheckerStore().category = category;
}

</script>

<style scoped lang="scss"></style>