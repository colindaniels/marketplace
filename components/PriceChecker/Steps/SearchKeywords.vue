<template>
    <div class="flex-col gap-40">
        <div class="flex gap-15">
            <InputBox v-model="usePriceCheckerStore().keywords"/>
            <Btn :inactive="!usePriceCheckerStore().keywords.length" @click="$emit('nextStep')" class="bottom-auto">Continue</Btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'

</script>

<style scoped lang="scss"></style>