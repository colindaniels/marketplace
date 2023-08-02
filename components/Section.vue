<template>
    <div class="section default-top flex-col gap-40">
        <h2>{{ title }}</h2>
        <slot/>
    </div>
</template>

<script setup lang="ts">

defineProps({
    title: String
})

</script>

<style scoped lang="scss">
.section {
    width: 100%;
    padding: 40px;
    background-color: $color-section;
    border-radius: 15px;
    box-shadow: $box-shadow

}
</style>