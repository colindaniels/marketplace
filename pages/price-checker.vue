<template>
    <div>
        <div class="card flex-col gap-60">
            <PriceCheckerProgressBar></PriceCheckerProgressBar>
            <div class="flex-col gap-20">
                <h3 class="text-center">Search Keywords</h3>
                <h5 class="text-center color-text-light">Enter a quick description of the item you are selling. Treat this like the search bar for eBay. We’ll search the website using these keywords and help you refine results.</h5>
                <div class="card sm">
                    <PriceCheckerStepsSearchKeywords v-if="current_step == 0" @nextStep="current_step++" />
                    <PriceCheckerStepsSelectCategory v-if="current_step == 1" @nextStep="current_step++" />
                    <PriceCheckerStepsSelectAspects v-if="current_step == 2" @nextStep="current_step++" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const current_step = ref(0)
</script>

<style lang="scss" scoped>
.card {
    padding: 40px;
    background-color: white;
    border-radius: 10px;
    box-shadow: $box-shadow;
    width: max-content;
    width: 100%;
    max-width: 600px;

    &.sm {
        padding: 20px;
    }
}
</style>