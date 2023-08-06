<template>
    <div>
        <div class="card flex-col gap-60">
            <PriceCheckerProgressBar></PriceCheckerProgressBar>
            
            <PriceCheckerStep title="Search Keywords" description="Enter a quick description of the item you are selling. Treat this like the search bar for eBay. We’ll search the website using these keywords and help you refine results.">
                <div class="card sm">
                    <PriceCheckerStepsSearchKeywords></PriceCheckerStepsSearchKeywords>
                </div>
            </PriceCheckerStep>
        </div>
    </div>
</template>

<script setup lang="ts">

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