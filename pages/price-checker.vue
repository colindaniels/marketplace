<template>
    <Section title="Price Checker">
        <div class="card flex-col gap-60">
            <PriceCheckerProgressBar @backtrack="backtrack" :current_step="current_step"></PriceCheckerProgressBar>

            <PriceCheckerStep title="Search keywords" description="Enter a quick description of the item you are selling. Treat this like the search bar for eBay. We’ll search the website using these keywords and help you refine results." v-if="current_step == 0">
                <PriceCheckerStepsSearchKeywords @nextStep="current_step++" />
            </PriceCheckerStep>
            <PriceCheckerStep title="Select Category" description="Select the category that best matches your item. If you don’t see a fitting category, try re-entering your keywords or continue without a category." v-if="current_step == 1">
                <PriceCheckerStepsSelectCategory @nextStep="current_step++" />
            </PriceCheckerStep>
            <PriceCheckerStep title="Select Aspects" description="Refine your search. Select some filters to help narrow down your search. If you don't know certain details about your item or think it’s unimportant, you can skip it. Nothings required." v-if="current_step == 2">
                <PriceCheckerStepsSelectAspects @nextStep="current_step++" />
            </PriceCheckerStep>
            <PriceCheckerStep nocard v-if="current_step == 3">
                <PriceCheckerStepsAnalytics />
            </PriceCheckerStep>
        </div>
    </Section>
</template>

<script setup lang="ts">
const current_step = ref(0)

function backtrack(toIndex: number) {
    current_step.value = toIndex
}

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
}
</style>