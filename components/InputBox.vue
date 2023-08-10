<template>
    <div :class="{ 'placeholder-raise': placeholder_raise, 'focused': input_focused }" class="input-box">
        <div class="placeholder">Eg. Apple iPhone X 64 GB</div>
        <input v-model="input_value" @input="handleInput" @focusin="handleFocusIn" @focusout="handleFocusOut" type="text">
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits()

const input_value = ref('')
const placeholder_raise = ref(false)
const input_focused = ref(false)

function handleFocusIn() {
    placeholder_raise.value = true
    input_focused.value = true
}
function handleFocusOut() {
    if (input_value.value.length == 0) {
        placeholder_raise.value = false
    }
    input_focused.value = false
}

function handleInput() {
    emit('update:modelValue', input_value.value);
}

watch(input_value, () => {
    if (input_value.value.length) {
        input_focused.value = true
        placeholder_raise.value = true
    }
})

</script>

<style scoped lang="scss">
.input-box {
    width: 100%;
    position: relative;
    border-radius: 7px;
    border: 2px solid $color-super-light-gray;
    height: 40px;
    transition: all 0.1s ease-in-out;
    background-color: white;
    input {
        width: 100%;
        height: 100%;
        color: $color-text-dark;
        font-size: $font-size-normal;
        font-weight: 600;
        border: none;
        z-index: 1;
        padding: 0;
        padding-left: 10px;
        position: relative;
        background-color: transparent;
        &:focus {
            outline: none;
        }
    }

    .placeholder {
        padding-left: 10px;
        position: absolute;
        color: $color-text-light;
        font-weight: 400;
        font-size: $font-size-normal;
        z-index: 0;
        transition: all 0.1s ease-in-out;
        top: 50%;
        transform: translateY(-50%);
        white-space: nowrap;
    }
}

.input-box.placeholder-raise {
    margin-top: 22px;
    .placeholder {
        top: 0;
        transform: translate(-7px, -25px);
        font-size: $font-size-small;
    }
}
.input-box.focused {
    border: 2px solid $color-primary;
}

</style>