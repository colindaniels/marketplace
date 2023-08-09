<template>
    <div class="flex-col gap-40">
        <div class="flex-col gap-20">
            <div class="flex-col gap-10">
                <h5 class="weight-semi-bold">Model</h5>
                <SlideBtn @selected="selectAspect" :values="test_list[0]" :current_value="test_value" />
            </div>
            <div class="flex-col gap-10">
                <h5 class="weight-semi-bold">Model</h5>
                <SlideBtn @selected="selectAspect" :values="test_list[1]" :current_value="test_value" />
            </div>
        </div>

        <Btn @click="$emit('nextStep')" :inactive="!test_value" class=" left-auto right-auto">Continue</Btn>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const test_list = ref([
    ['Apple iPhone X', 'Apple iPhone 8', 'Apple iPhone XS Max'],
    ['Apple', 'Samsung', 'idk blackberry?'],

])

const test_value = ref('')

function selectAspect(aspect: any) {
    test_value.value = aspect
}

</script>

<style scoped lang="scss"></style>