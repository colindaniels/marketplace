<template>
    <div class="flex-col gap-20 align-center">
        <h3 class="text-center">{{ title }}</h3>
        <h5 class="text-center color-text-light">{{ description }}</h5>
        <div :class="{ card: !nocard }">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    description: String,
    nocard: Boolean
})
</script>

<style scoped lang="scss">
.card {
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: $box-shadow;
    width: max-content;
    width: 100%;
    max-width: 600px;
}
</style>