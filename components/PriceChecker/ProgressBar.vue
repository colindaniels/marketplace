<template>
    <div class="progress-bar">
        <div v-for="step, index in steps" class="flex align-center">
            <div @click="$emit('backtrack', index)" class="step" :class="{ active: current_step >= index, hoverable: current_step >= index }">
                <font-awesome-icon :icon="step.icon" size="lg" />
                <div class="text">
                    <h5>{{ step.name }}</h5>
                </div>
            </div>
            <div v-if="index !== steps.length -1" class="step-divider" :class="{ active: current_step -1 >= index }"></div>
        </div>

    </div>
</template>

<script setup lang="ts">

defineProps({
    current_step: Number
})

const steps = ref([
    {
        name: 'Search Keywords',
        icon: ['fas', 'magnifying-glass']
    },
    {
        name: 'Select Category',
        icon: ['fas', 'layer-group']
    },
    {
        name: 'Select Aspects',
        icon: ['fas', 'list']
    },
    {
        name: 'Analytics',
        icon: ['fas', 'chart-line']
    }
])

</script>

<style scoped lang="scss">
.progress-bar {
    display: flex;
    justify-content: center;
    .step {
        color: $color-text-light;
        padding: 10px;
        border-radius: 10px;
        border: 4px solid $color-super-light-gray;
        position: relative;
        display: flex;
        justify-content: center;
        pointer-events: none;

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
        &.hoverable {
            pointer-events: all;
        }

        &.hoverable:hover {
            cursor: pointer;
            border: 4px solid $color-primary-hover;
            color: $color-primary-hover;

            .text {
                color: $color-primary-hover;
            }
        }
    }

    .step-divider {
        width: 100px;
        height: 6px;
        background-color: $color-super-light-gray;

        &.active {
            background-color: $color-primary;
        }
    }
}
</style>