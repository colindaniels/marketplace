<template>
    <button :class="{ max: size == 'max', inactive, secondary }"><h4><slot/></h4></button>
</template>

<script setup lang="ts">
defineProps({
    size: String,
    inactive: Boolean,
    secondary: Boolean
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
    &.max {
        width: 100%;
    }
    &.inactive {
        background-color: transparent;
        border: 2px solid $color-super-light-gray;
        color: $color-text-light;
        pointer-events: none;
    }
    &.secondary {
        background-color: $color-super-light-gray;
        transition: all 0.1s ease-in-out;
        color: $color-text-light;
        &:hover {
            background-color: $color-light-gray;
        }
    }
}
</style>