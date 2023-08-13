<template>
    <div class="flex-col gap-40">
        <div v-if="!pending" class="flex-col gap-20">
            <SlideBtn :pending="new_aspects_pending" v-for="(values, name) in usePriceCheckerStore().aspects" @selected="selectAspects" :name="name"
                :data="values"/>
        </div>
        <div v-else>LOADING...</div>

        <Btn @click="$emit('nextStep')" class=" left-auto right-auto">Continue</Btn>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const { data, pending } = useFetch('/api/getAspects', { params: { new_url: usePriceCheckerStore().selected_category.value } })


watch(data, () => {
    usePriceCheckerStore().aspects = data.value.aspects
    usePriceCheckerStore().selected_aspects = Object.fromEntries(Object.entries(usePriceCheckerStore().aspects).map(([key, value]) => [key, value.filter(obj => obj.selected === true)]).filter(([, value]) => value.length > 0));
})

const new_aspects_pending = ref(false)


function selectAspects(name: string, d: any, recent: any) {
    new_aspects_pending.value = true
    useFetch('/api/getAspects', { params: { new_url: recent.value } }).then((response) => {
        data.value = response.data.value
        new_aspects_pending.value = false
        usePriceCheckerStore().current_ebay_url = recent.value
    })

}

</script>

<style scoped lang="scss"></style>