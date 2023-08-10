<template>
    <div class="flex-col gap-40" v-if="!pending">
        <div class="flex-col gap-20">
            <SlideBtn v-for="(values, name) in usePriceCheckerStore().aspects" @selected="selectAspects" :name="name" :data="values" :current_value="usePriceCheckerStore().selected_aspects"/>
        </div>

        <Btn @click="$emit('nextStep')" :inactive="aspectsEmpty" class=" left-auto right-auto">Continue</Btn>
    </div>
    <div v-else>LOADING...</div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const { data, pending } = useFetch('/api/getAspects', { params: { new_url: usePriceCheckerStore().selected_category.value } })


watch(data, () => {
    usePriceCheckerStore().aspects = data.value.aspects
})




function selectAspects(name: string, d: any, recent: any) {
    pending.value = true
    useFetch('/api/getAspects', { params: { new_url: recent.value } }).then((response) => {
        data.value = response.data.value
        pending.value = false
    })

}


const aspectsEmpty = computed(() => Object.values(usePriceCheckerStore().selected_aspects).every(innerArr => innerArr.length === 0))

</script>

<style scoped lang="scss"></style>