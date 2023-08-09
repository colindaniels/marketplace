<template>
    <div class="flex-col gap-40">
        <div class="flex-col gap-20">
            <SlideBtn v-for="(values, name) in aspects" @selected="selectAspects" :name="name" :values="values" :current_value="usePriceCheckerStore().aspects[name]" />
        </div>

        <Btn @click="$emit('nextStep')" :inactive="aspectsEmpty" class=" left-auto right-auto">Continue</Btn>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const aspects = ref({
    'Model': ['Apple iPhone X', 'Apple iPhone 8', 'Apple iPhone XS Max'],
    'Brand': ['Apple', 'Samsung', 'idk blackberry?']

})


function selectAspects(name: string, value: any) {
    usePriceCheckerStore().aspects[name] = value
}

const aspectsEmpty = computed(() => Object.values(usePriceCheckerStore().aspects).every(innerArr => innerArr.length === 0))

</script>

<style scoped lang="scss"></style>