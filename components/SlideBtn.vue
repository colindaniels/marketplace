<template>
    <div class="flex-col gap-10">
        <h5 class="weight-semi-bold">{{ name }}</h5>
        <div class="flex-wrap gap-10">
            <div class="btn flex align-center gap-15"
                :class="{ selected: current_value?.value == d.value || d.selected }" @click="select(d)"
                v-for="d in data">
                <div v-if="unique" class="radio"></div>
                <h5 class="value">{{ d.name }}</h5>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: String,
    data: Array,
    unique: Boolean,
    current_value: Object
})
const emit = defineEmits()


function select(d: any) {
    if (props.unique) {
        emit('selected', props.name, d)

    }
    else {
        emit('selected', props.name, props.current_value, d);
    }

}


</script>

<style scoped lang="scss">
.btn {
    padding: 7px 10px;
    border: 2px solid $color-super-light-gray;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    width: max-content;

    &:hover {
        background-color: $color-super-light-gray;

        .radio {
            border: 2px solid white;
        }

    }

    &.selected {
        border: 2px solid $color-primary;

        .radio {
            border: 2px solid $color-primary;

            &::before {
                width: 60%;
                height: 60%;
            }
        }

        .value {
            font-weight: 600;
        }
    }

    .radio {
        width: 20px;
        height: 20px;
        border: 2px solid $color-super-light-gray;
        border-radius: 50%;
        transition: all 0.1s ease-in-out;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            background-color: $color-primary;
            width: 0px;
            height: 0px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            transition: all 0.1s ease-in-out;
        }
    }
}
</style>