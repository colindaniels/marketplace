<template>
    <div class="flex gap-40 nav-container" :class="{ collapsed: collapsed }">
        <nav class="no-shrink default-top">
            <ol>
                <NuxtLink @click="hideSelector" to="/" class="logo">
                    <img src="@/assets/brand/logo.svg" alt="" />
                    <h4 class="color-text-dark nowrap bold">Marketplace API</h4>
                </NuxtLink>
            </ol>
            <div class="selectors">
                <div class="selector" v-if="!hidden" :style="{ top: `${selectorTop}px` }"></div>
                <ol>
                    <NuxtLink :to="menuItem.link" class="hover-levitate" :class="{ selected: selectedIndex == index }"
                        v-for="(menuItem, index) in menuItems" :key="index"
                        @click="handleItemClick($event.currentTarget, index); selectedIndex = index;">
                        <font-awesome-icon :icon="menuItem.icon" />
                        <h4>{{ menuItem.title }}</h4>

                    </NuxtLink>
                </ol>
                <ol>
                    <NuxtLink :class="{ selected: selectedIndex == 4 }"
                        @click="handleItemClick($event.currentTarget, 4); selectedIndex = 4;">
                        <font-awesome-icon :icon="['fas', 'gear']" />
                        <h4>Settings</h4>

                    </NuxtLink>
                </ol>
            </div>

        </nav>
        <div class="divider vertical sidebar-divider">
            <div class="collapse-box default-top" @click="collapsed = !collapsed">
                <font-awesome-icon :icon="['fas', 'angle-left']" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
const selectorTop = ref(0);
const menuItems = [
    { title: 'Dashboard', link: 'dashboard', icon: ['fas', 'grid-2'] },
    { title: 'Price Checker', link: 'price-checker', icon: ['fas', 'magnifying-glass'] },
    { title: 'Saved Searches', link: 'saved-searches', icon: ['fas', 'star'] },
    { title: 'Advanced Search', link: 'advanced-search', icon: ['fas', 'chart-line-up'] },
];

const selectedIndex = ref(0)
const collapsed = ref(false)

const hidden = ref(false)


function handleItemClick(clickedElement, index) {
    selectorTop.value = clickedElement.offsetTop;
    selectedIndex.value = index
    hidden.value = false
}

function hideSelector() {
    selectedIndex.value = -1
    hidden.value = true

}

</script>
  
<style lang="scss" scoped>
.nav-container {
    position: relative;

    &.collapsed {
        nav {
            width: 45px;
        }

        .collapse-box svg {
            transform: rotate(180deg);
        }
    }
}

.collapse-box svg {
    transition: transform 0.2s ease-in-out
}

nav {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 200px;
    transition: width 0.2s ease-in-out;
    overflow: hidden;
    white-space: nowrap;



    .selectors {
        display: flex;
        flex-direction: column;
        gap: 25px;
        position: relative;
    }

    ol {
        display: flex;
        flex-direction: column;
        gap: 5px;

        a {
            display: flex;
            align-items: center;
            gap: 15px;
            color: inherit;
            color: $color-text-light;
            height: 45px;
            cursor: pointer;
            transition: 0.1s ease-in-out;
            padding-left: 15px;

            &:hover,
            &.selected {
                color: $color-primary;
            }

            &:hover {
                transform: translate(1px, -1px);
            }
        }

    }

    .selector {
        width: 100%;
        height: 45px;
        background: $color-primary-selected;
        border-radius: 10px;
        position: absolute;
        top: 0;
        transition: top 0.2s ease-in-out;
    }
}

.sidebar-divider {
    height: 100%;
    min-height: 100vh;
    transition: left 0.2s ease-in-out;

    .collapse-box {
        width: 40px;
        height: 40px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%);
        border-radius: 10px;
        font-size: 20px;
        color: $color-text-dark;
        border: 2px solid $color-light-gray;
        transition: background-color 0.1s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: $color-light-gray;
        }
    }

}

.logo {
    img {
        height: 1.5em;
    }
}
</style>
  