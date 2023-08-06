<template>
    <button :class="{ max: size == 'max' }"><h4>{{ text }}</h4></button>
</template>

<script setup lang="ts">
defineProps({
    text: String,
    size: String
})
</script>

<style scoped lang="scss">
button {
    background-color: $color-primary;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    width: max-content;
    height: 40px;
    padding-left: 25px;
    padding-right: 25px;
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: $color-primary-hover;
    }
}
</style>