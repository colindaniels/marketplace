<template>
    <div class="flex-col gap-20">
        <h3 class="text-center">{{ title }}</h3>
        <h5 class="text-center color-text-light">{{ description }}</h5>
        <slot/>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    description: String
})
</script>

<style scoped lang="scss">

</style>