<template>
    <div class="progress-bar">
        <div class="step active">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg"/>
            <div class="text"><h5>Search Keywords</h5></div>
        </div>
        <div class="step-divider active"></div>
        <div class="step">
            <font-awesome-icon :icon="['fas', 'layer-group']" size="lg"/>
            <div class="text"><h5>Select Category</h5></div>
        </div>
        <div class="step-divider"></div>
        <div class="step">
            <font-awesome-icon :icon="['fas', 'list']" size="lg"/>
            <div class="text"><h5>Select Aspects</h5></div>
        </div>
        <div class="step-divider"></div>
        <div class="step">
            <font-awesome-icon :icon="['fas', 'chart-line']" size="lg"/>
            <div class="text"><h5>Analytics</h5></div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.progress-bar {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;

    .step {
        color: $color-text-light;
        padding: 10px;
        border-radius: 10px;
        border: 4px solid $color-super-light-gray;
        position: relative;
        display: flex;
        justify-content: center;

        &.active {
            color: $color-primary;
            border: 4px solid $color-primary;
            .text h5 {
                font-weight: bold;
            }
        }
        .text {
            position: absolute;
            text-align: center;
            top: calc(100% + 10px);
            width: 120px;
        }
    }

    .step-divider {
        width: 100%;
        max-width: 100px;
        height: 6px;
        background-color: $color-super-light-gray;

        &.active {
            background-color: $color-primary;
        }
    }
}
</style>