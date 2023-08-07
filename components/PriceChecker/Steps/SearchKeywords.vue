<template>
    <div class="flex-col gap-40">
        <div class="flex gap-15">
            <InputBox />
            <Btn @click="$emit('nextStep')" text="Submit" class="bottom-auto" />
        </div>
        <h5 class="color-text-light link width-max left-auto right-auto">I already have a eBay URL of filtered results</h5>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss"></style>