<template>
    <div class="card flex-col gap-20">
        <div class="flex gap-20">
            <img src="@/assets/images/iphone.png" alt="">
            <div class="flex-col gap-5">
                <h3>Apple iPhone X</h3>
                <h4 class="color-text-light">Smartphones & Accessories</h4>
            </div>
        </div>
        <div class="flex-col gap-20">
            <div class="selector-box flex">
                <div class="selector" :style="{ left: `${selectorLeft}px` }"></div>
                <ol class="flex height-100">
                    <li class="option"
                        :class="{ selected: selectedIndex == index }" v-for="(menuItem, index) in menuItems" :key="index"
                        @click="handleItemClick($event.currentTarget); selectedIndex = index;">
                        <h4>{{ menuItem }}</h4>
                    </li>
                </ol>

            </div>
            <div class="flex gap-5 align-center"><h3>$453.67</h3><h5 class="color-status-success">3.2%</h5></div>
            <div class="flex-wrap gap-10">
                <div class="aspect"><h5>64 GB</h5></div>
                <div class="aspect"><h5>Apple iPhone X</h5></div>
                <div class="aspect"><h5>Unlocked</h5></div>
                <div class="aspect"><h5>Used</h5></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const selectorLeft = ref(4);
const menuItems = [
    'Quick Info',
    'Analytics',
    'Settings'
]
const selectedIndex = ref(0)

function handleItemClick(clickedElement) {
    selectorLeft.value = clickedElement.offsetLeft
}

</script>

<style scoped lang="scss">
.card {
    padding: 25px;
    background-color: white;
    width: max-content;
    box-shadow: $box-shadow;
    border-radius: 15px;
    transition: all 0.1s ease-in-out;
    position: relative;

    img {
        height: 50px
    }

    /*
    &:hover {
        box-shadow: 0px 8px 40px 5px rgba(0, 0, 0, 0.15);
        transform: translate(5px, -5px);
    }
    */
}

.aspect {
    background-color: $color-super-light-gray;
    padding: 10px;
    border-radius: 5px;
}

.selector-box {
    height: 46px;
    background-color: $color-light-blue-gray;
    border-radius: 10px;
    padding: 4px;
    position: relative;
    align-items: center;

    .option {
        color: $color-text-light;
        width: 130px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        cursor: pointer;
        transition: 0.1s all ease-in-out;
        &.selected {
            color: $color-text-dark;
        }

    }
}

.selector {
    position: absolute;
    width: 130px;
    height: 40px;
    background: white;
    border-radius: 10px;
    z-index: 0;
    height: 38px;
    transition: left 0.2s ease-in-out;
    box-shadow: $box-shadow;
}

</style>