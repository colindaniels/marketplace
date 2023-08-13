<template>
    <div :class="{ collapse }" class="card flex-col gap-20" @click="expandCard">
        <div class="flex gap-20 clickable" @click="collapseCard">
            <img src="@/assets/images/iphone.png" alt="">
            <div class="flex-col gap-5">
                <h3>{{ title }}</h3>
                <h4 class="color-text-light">{{ category }}</h4>
            </div>
            <font-awesome-icon :icon="['fas', 'angle-down']" size="xl" class="right-auto bottom-auto top-auto" />

        </div>
        <div class="flex-col gap-20 gap-collapse">
            <div class="selector-box flex collapsable">
                <div class="selector" :style="{ left: `${selectorLeft}px` }"></div>
                <ol class="flex height-100">
                    <li class="option" :class="{ selected: selectedIndex == index }" v-for="(menuItem, index) in menuItems"
                        :key="index" @click="handleItemClick($event.currentTarget); selectedIndex = index;">
                        <h4>{{ menuItem }}</h4>
                    </li>
                </ol>
            </div>
            <div class="divider light collapsable"></div>
            <div v-if="selectedIndex == 0" class="flex-col gap-20 gap-collapse">
                <div class="flex">
                    <div class="flex-col gap-10">
                        <div class="flex-col gap-3">
                            <h5 class="color-text-light collapsable">Median Price</h5>
                            <div class="flex gap-5 align-center">
                                <h3>{{ median_price }}</h3>
                                <h5 class="color-status-success weight-bold">3.2%</h5>
                            </div>
                        </div>
                        <div class="status-box color-status-standby-background collapsable">
                            <h5 class="color-status-standby">Sold Items Only</h5>
                        </div>
                    </div>
                    <div class="flex-col gap-10 right-auto collapsable">
                        <div class="flex-col gap-3">
                            <h5 class="color-text-light">Analyzed Listings</h5>
                            <div class="flex gap-5 right-auto">
                                <h3>{{ reactive_listings?.length }}</h3>
                            </div>
                        </div>
                        <div class="status-box color-status-error-background right-auto">
                            <h5 class="color-status-error">12 excluded</h5>
                        </div>
                        <div class="status-box color-status-standby-background right-auto">
                            <h5 class="color-status-standby">{{ total_results }} total</h5>
                        </div>
                    </div>

                </div>


                <div class="divider dashed collapsable"></div>
                <div class="flex-col gap-20 gap-collapse aspects-holder">
                    <div class="flex-col gap-3 aspects" v-for="aspects, name in usePriceCheckerStore().selected_aspects">
                        <h5 class="name color-text-light">{{ name }}</h5>
                        <div class="values flex-col gap-5">
                            <h4 v-for="aspect in aspects" class="weight-semi-bold value">{{ aspect.name }}</h4>
                        </div>
                    </div>
                </div>
                <!--
                <div class="show-more">
                    <h5 class="color-text-light weight-semi-bold">+1 more</h5>
                </div>
                -->
            </div>
            <div v-else-if="selectedIndex == 1" class="flex-col gap-20 collapsable">
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
                                <h5 class="color-text-light">Median Price</h5>
                                <div class="flex gap-5 align-center">
                                    <h3>{{ median_price }}</h3>
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
                                    :style="{ left: `${mouseX + 10}px`, top: `${mouseY - 65}px` }">
                                    <div class="flex-col gap-10">
                                        <div class="flex-col gap-5">
                                            <h6><span class="color-text-primary weight-bold">{{ hover_bins }}</span>
                                                Listings</h6>
                                            <h6><span class="color-text-primary weight-bold">${{ min_price_bin }}</span> -
                                                <span class="color-text-primary weight-bold">${{ max_price_bin }}</span>
                                            </h6>
                                            <h6 class="weight-bold">Click to see listings</h6>
                                        </div>
                                    </div>
                                </div>
                                <div v-for="(binData, index) in bins" :key="index" @click="barClick(binData)"
                                    :style="{ height: `${(binData.length / top_bin) * 100}%` }" class="bar"
                                    @mouseenter="showInfo(binData)" @mouseleave="killInfo"></div>
                            </div>
                            <div class="flex justify-between">
                                <h6 class="color-text-light">${{ min_price }}</h6>
                                <h6 class="color-text-light">{{ mean_price }}</h6>
                                <h6 class="color-text-light">${{ max_price }}</h6>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="listings flex-col gap-15" :class="{ 'active': showListings }">
                    <div v-for="item in current_bin_listings" :class="{ excluded: !item.included }"
                        class="listing-card flex gap-5" @click="listingClick(item)">
                        <div class="hover-indicator"></div>
                        <img :src="item.image_url" alt="listing-image">
                        <div class="flex-col gap-5">
                            <h6 class="color-marketplace-green">Sold {{ formattedDate(item.date_sold) }}</h6>
                            <h5 class="weight-semi-bold">{{ item.title }}</h5>
                            <h5 class="color-text-light"><span v-for="secondary, si in item.secondary_info">{{ secondary
                            }}<span v-if="si < item.secondary_info.length - 1"> • </span></span></h5>
                            <div class="flex-col gap-3">
                                <h3 v-if="item.price.is_price_range" class="color-marketplace-green weight-semi-bold">${{
                                    item.price.price_lower }} - ${{ item.price.price_upper }}</h3>
                                <h3 v-else class="color-marketplace-green weight-semi-bold">${{ item.price.price_value }}
                                </h3>
                                <h5 class="color-text-light">Buy It Now</h5>
                                <h5 v-if="item.shipping_price == 'Free'" class="color-text-light">Free Shipping</h5>
                                <h5 v-else-if="item.shipping_price" class="color-text-light">+${{ item.shipping_price }}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="divider light collapsable"></div>
            <div v-if="fragile" class="flex gap-20 collapsable">
                <Btn size="max">Save Listing</Btn>
                <Btn secondary size="max">Delete</Btn>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { usePriceCheckerStore } from '@/stores/price-checker'
const props = defineProps({
    title: String,
    total_results: String,
    category: String,
    listings: Array,
    fragile: Boolean
})


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

const selectedIndex = ref(0)
const sideIndex = ref(0)
const collapse = ref(false)
const show_info = ref(false)


function expandCard(e) {
    if (collapse.value) {
        collapse.value = false
        e.stopPropagation()
    }
}
function collapseCard(e) {
    if (!collapse.value) {
        collapse.value = true
        e.stopPropagation()
    }

}



function handleItemClick(clickedElement) {
    selectorLeft.value = clickedElement.offsetLeft
}

function handleSideClick(clickedElement) {
    selectorTop.value = clickedElement.offsetTop
}


const max_price_bin = ref(0)
const min_price_bin = ref(0)

const hover_bins = ref(0)
function showInfo(binData) {
    hover_bins.value = binData.length
    max_price_bin.value = Math.max(...binData.map(obj => obj.price.price_value));
    min_price_bin.value = Math.min(...binData.map(obj => obj.price.price_value));

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

function barClick(binData) {
    current_bin_listings.value = binData
    //current_bin_listings.value = props.listings
    showListings.value = true;
}

const showListings = ref(false)


const median_price = computed(() => `$${[...reactive_listings.value.map(obj => obj.price.price_value)].sort((a, b) => a - b)[Math.floor(reactive_listings.value.length / 2)]}`)

const mean_price = computed(() => reactive_listings.value.reduce((sum, obj) => sum + obj.price.price_value, 0) / reactive_listings.value.length)

function formattedDate(inputDate: String) {
    let d = new Date(inputDate)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function listingClick(listing) {
    console.log(listing)
}

const reactive_listings = ref(props.listings)

const bins = ref([])
const min_price = ref(0)
const max_price = ref(0)

const top_bin = ref(0)


const current_bin_listings = ref([])


const calculateBins = () => {
    const numBins = 11
    const prices = reactive_listings.value.map(item => item.price.price_value);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    min_price.value = minPrice
    max_price.value = maxPrice

    const binSize = (maxPrice - minPrice) / numBins;



    // Initialize bins array with empty arrays
    bins.value = Array(numBins).fill().map(() => []);
    // Calculate frequencies for each bin
    for (const item of reactive_listings.value) {
        const binIndex = Math.floor((item.price.price_value - minPrice) / binSize);
        // Ensure binIndex is within bounds
        const safeBinIndex = Math.min(Math.max(binIndex, 0), numBins - 1);

        bins.value[safeBinIndex].push(item);
    }

    top_bin.value = Math.max(...bins.value.map(bin => bin.length));
    console.log(top_bin)
}
calculateBins()



</script>

<style scoped lang="scss">
.card {
    padding: 25px;
    background-color: white;
    width: max-content;
    box-shadow: $box-shadow;
    border-radius: 15px;
    position: relative;
    width: 450px;
    overflow: hidden;

    img {
        height: 50px
    }
}

.card .collapsable {
    transition: all 0.2s ease-in-out;
    max-height: 1000px;
    overflow: hidden;
}

.card.collapse {
    .collapsable {
        max-height: 0;
        padding: 0;
        gap: 0;
        overflow: hidden;
    }

    .aspects-holder {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px !important;

        .aspects {
            width: max-content;

            .name {
                width: 0;
                height: 0;
                overflow: hidden;
            }

            .values {
                flex-direction: row;

                .value {
                    background-color: $color-super-light-gray;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: $font-size-small;
                }
            }
        }
    }

}

.card .gap-collapse {
    transition: all 0.2s ease-in-out;
}

.card.collapse .gap-collapse {
    gap: 0;
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
            width: 100%;
            border-radius: 5px 5px 0 0;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
            position: relative;

            &:hover {
                box-shadow: $box-shadow;
                transform: translate(1px, -2px);
                background-color: $color-primary;
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
            pointer-events: none;

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
    padding: 0px;

    &.active {
        max-height: 550px;

        .listing-card {
            padding: 10px;
            border-radius: 7px;
            width: 100%;
            position: relative;
            background-color: white;
            position: relative;
            border: 2px solid $color-light-gray;
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
                    content: 'Click to Exclude from Analytics';
                    text-align: center;
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

            &.excluded {
                border: 2px solid $color-status-error;

                &::before {
                    position: absolute;
                    content: 'Excluded';
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

                &:hover {
                    border: 2px solid $color-status-success;

                    &::before {
                        content: 'Add back';
                    }
                }
            }
        }

    }

}
</style>