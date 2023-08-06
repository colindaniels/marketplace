<template>
    <div class="card flex-col gap-20" @click="handleExpand('card');" :class="{ collapsed: collapse }">
        <div class="flex gap-20 clickable" @click.stop="handleExpand('title');">
            <img src="@/assets/images/iphone.png" alt="">
            <div class="flex-col gap-5">
                <h3>Apple iPhone X</h3>
                <h4 class="color-text-light">Smartphones & Accessories</h4>
            </div>
            <font-awesome-icon :icon="['fas', 'angle-down']" size="xl" class="right-auto bottom-auto top-auto collapsable"
                :class="{ collapse }" />

        </div>
        <div class="flex-col gap-20 flex-collapsable" :class="{ 'flex-collapse': collapse }">
            <div class="selector-box flex collapsable" :class="{ collapse }">
                <div class="selector" :style="{ left: `${selectorLeft}px` }"></div>
                <ol class="flex height-100">
                    <li class="option" :class="{ selected: selectedIndex == index }" v-for="(menuItem, index) in menuItems"
                        :key="index" @click="handleItemClick($event.currentTarget); selectedIndex = index;">
                        <h4>{{ menuItem }}</h4>
                    </li>
                </ol>
            </div>
            <div class="divider light collapsable" :class="{ collapse }"></div>
            <div v-if="selectedIndex == 0" class="flex-col gap-20 flex-collapsable" :class="{ 'flex-collapse': collapse }">
                <div class="flex">
                    <div class="flex-col gap-10 flex-collapsable" :class="{ 'flex-collapse': collapse }">
                        <div class="flex-col gap-3">
                            <h5 class="color-text-light collapsable" :class="{ collapse }">Median Price</h5>
                            <div class="flex gap-5 align-center">
                                <h3>$453.67</h3>
                                <h5 class="color-status-success weight-bold">3.2%</h5>
                            </div>
                        </div>
                        <div class="status-box color-status-standby-background collapsable" :class="{ collapse }">
                            <h5 class=" color-status-standby">Sold Items Only</h5>
                        </div>
                    </div>

                    <div class="flex-col gap-3 right-auto collapsable" :class="{ collapse }">
                        <h5 class="color-text-light">Total Results</h5>
                        <div class="flex gap-5 right-auto">
                            <h3>312</h3>
                        </div>
                    </div>
                </div>


                <div class="divider dashed light collapsable" :class="{ collapse }"></div>
                <div class="flex-col gap-20 collapsable" :class="{ collapse }">
                    <div class="flex-col gap-3">
                        <h5 class="color-text-light ">Brand</h5>
                        <div class="flex gap-5">
                            <h4 class="weight-semi-bold">Apple&nbsp;&nbsp;•&nbsp;&nbsp;Samsung</h4>
                        </div>
                    </div>
                    <div class="flex-col gap-3">
                        <h5 class="color-text-light ">Model</h5>
                        <div class="flex gap-5">
                            <h4 class="weight-semi-bold">Apple iPhone X&nbsp;&nbsp;•&nbsp;&nbsp;Apple iPhone 8</h4>
                        </div>
                    </div>
                    <div class="flex-col gap-3">
                        <h5 class="color-text-light ">Condition</h5>
                        <div class="flex gap-5">
                            <h4 class="weight-semi-bold">Used</h4>
                        </div>
                    </div>
                </div>
                <div class="show-more collapsable" :class="{ collapse }">
                    <h5 class="color-text-light weight-semi-bold">+1 more</h5>
                </div>
            </div>
            <div v-else-if="selectedIndex == 1" class="collapsable flex-col gap-20" :class="{ collapse }">
                <div class="flex gap-20">
                    <ol class="side-selector flex-col align-center">
                        <div class="selector" :style="{ top: `${selectorTop}px` }"></div>
                        <li class="hover-levitate" :class="{ selected: sideIndex == index }"
                            v-for="(sideItem, index) in sideItems" :key="index"
                            @click="handleSideClick($event.currentTarget); sideIndex = index;">
                            <h6>{{ sideItem }}</h6>
                        </li>
                    </ol>
                    <div class="flex-col gap-10 width-100">
                        <div class="flex">
                            <div class="flex-col gap-3">
                                <h5 class="color-text-light collapsable" :class="{ collapse }">Median Price</h5>
                                <div class="flex gap-5 align-center">
                                    <h3>$453.67</h3>
                                </div>
                            </div>
                            <div class="flex gap-15 color-text-light right-auto height-max">
                                <div class="flex gap-5 align-center">
                                    <div class="key background-primary"></div>
                                    <h5>Excluded</h5>
                                </div>
                                <div class="flex gap-5 align-center">
                                    <div class="key background-light"></div>
                                    <h5>Included</h5>
                                </div>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="content">
                                <div @mouseenter.prevent="showInfo" @mouseleave="killInfo" class="info-box"
                                    :class="{ active: show_info }"
                                    :style="{ left: `${mouseX + 5}px`, top: `${mouseY - 5}px` }">
                                    <div class="flex-col gap-10">
                                        <div class="flex-col gap-5">
                                            <h6><span class="color-text-primary weight-bold">10</span> Listings</h6>
                                            <h6 class="weight-bold">Click to see listings</h6>
                                        </div>
                                    </div>
                                </div>
                                <div @click="barClick" v-for="i in 11" style="height: 50%;" class="bar"
                                    @mouseenter="showInfo" @mouseleave="killInfo"></div>
                            </div>
                            <div class="flex justify-between">
                                <h6 class="color-text-light">$128.65</h6>
                                <h6 class="color-text-light">$453.67</h6>
                                <h6 class="color-text-light">$767.12</h6>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="divider light"></div>
                <div class="listings flex-col gap-15" :class="{ 'active': showListings }">
                    <div v-for="i in 10" class="listing-card flex gap-5">
                        <div class="hover-indicator"></div>
                        <img src="@/assets/images/example-product.webp" alt="listing-image">
                        <div class="flex-col gap-5">
                            <h6 class="color-marketplace-green">Sold Jun 27, 2023</h6>
                            <h5 class="weight-semi-bold">Apple iPhone 14 Plus - 128GB - Midnight A2632 VERIZON OPEN BOX FOR
                                PARTS - MDM</h5>
                            <h5 class="color-text-light">Parts Only · Apple iPhone 14 Plus · 128 GB · Verizon</h5>
                            <div class="flex-col gap-3">
                                <h3 class="color-marketplace-green weight-semi-bold">$254.60</h3>
                                <h5 class="color-text-light">Buy It Now</h5>
                                <h5 class="color-text-light">+$8.57 shipping</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
const selectorLeft = ref(4);
const selectorTop = ref(6);
const menuItems = [
    'Quick Info',
    'Analytics',
    'Settings'
]

const sideItems = [
    'Listings',
    'Price Change',
    'Demand',
    'Auction / BIN',
    'Raw Listings'
]

const selectedIndex = ref(1)
const sideIndex = ref(0)

const collapse = ref(false)

const show_info = ref(false)

function handleExpand(type: string) {
    if (collapse.value) {
        // expand
        collapse.value = false
    }
    else {
        if (type == 'title') {
            // collapse
            collapse.value = true
        }
    }

}

function handleItemClick(clickedElement) {
    selectorLeft.value = clickedElement.offsetLeft
}

function handleSideClick(clickedElement) {
    selectorTop.value = clickedElement.offsetTop
}


function showInfo() {
    show_info.value = true
    document.addEventListener('mousemove', updatePosition);
}
function killInfo() {
    show_info.value = false
    document.removeEventListener('mousemove', updatePosition);
}

const mouseX = ref(0);
const mouseY = ref(0);

const updatePosition = (event) => {
    mouseX.value = event.pageX - window.scrollX
    mouseY.value = event.pageY - window.scrollY
};

function barClick() {
    showListings.value = true;
}

const showListings = ref(false)


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
    max-width: 450px;

    img {
        height: 50px
    }
}

.card.collapsed:hover {
    box-shadow: 0px 8px 40px 5px rgba(0, 0, 0, 0.15);
    transform: translate(5px, -5px);
    cursor: pointer;
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
    width: 398px;

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

    .option {
        color: $color-text-light;
        width: 130px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:not(.selected):hover {
            transform: translate(1px, -1px);
        }

        &.selected {
            color: $color-text-dark;
        }

    }
}



.show-more {
    height: 35px;
    background-color: $color-light-blue-gray;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;
    border-radius: 5px;

    &:hover {
        background-color: $color-light-blue-gray-hover
    }
}

.collapsable {
    max-height: 1050px;
    max-width: 450px;
}

.collapse {
    overflow: hidden;
    max-height: 0;
    padding: 0;
    max-width: 0px;
}



.flex-collapse {
    gap: 0;
}

ol.side-selector {
    background-color: $color-light-blue-gray;
    width: 100px;
    border-radius: 10px;
    padding: 6px;
    position: relative;
    flex-shrink: 0;
    height: 100%;

    li {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        z-index: 1;
        cursor: pointer;

        &:hover,
        &.selected {
            color: $color-primary;
        }
    }

    .selector {
        position: absolute;
        width: calc(100% - 12px);
        height: 32px;
        background: $color-primary-selected;
        border-radius: 7px;
        z-index: 0;
        transition: top 0.2s ease-in-out;
    }

}

.key {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}


.chart {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .content {
        align-items: flex-end;
        justify-content: center;
        display: flex;
        gap: 5px;
        width: 100%;
        height: 136px;
        position: relative;

        .bar {
            background-color: $color-light-gray;
            width: 19px;
            border-radius: 6px 6px 0 0;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
            position: relative;

            &:hover {
                box-shadow: $box-shadow;
                transform: translate(1px, -2px);
            }

            &.included {
                background-color: $color-primary;
            }
        }

        .info-box {
            position: fixed;
            z-index: 0;
            opacity: 0;
            background-color: white;
            border-radius: 7px;
            box-shadow: $box-shadow;
            display: flex;
            color: $color-text-light;
            padding: 10px;

            &.active {
                opacity: 1;
                z-index: 1;
            }
        }
    }
}


.listings {
    max-height: 0px;
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow-y: scroll;

    &.active {
        max-height: 350px;

        .listing-card {
            padding: 10px;
            border-radius: 7px;
            width: 100%;
            position: relative;
            background-color: white;
            position: relative;
            box-shadow: inset 0px 0px 5px 3px rgba(0, 0, 0, 0.10);
            cursor: pointer;

            img {
                border-radius: 7px;
                width: 75px;
                height: 75px;
            }
            .hover-indicator {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: black;
                opacity: 0;
                left: 0;
                top: 0;
                border-radius: 7px;
                transition: all 0.1s ease-in-out;
            }
            &:hover {
                &::before {
                    position: absolute;
                    content: 'Click to Exclude';
                    font-size: 20px;
                    color: white;
                    z-index: 1;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-weight: bold;
                }
                .hover-indicator {
                    opacity: 0.4;
                }
            }
        }

    }

}
</style>