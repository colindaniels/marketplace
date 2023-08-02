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
            <div class="selector-box">
                <div class="selector" :style="{ top: `${selectorTop}px` }"></div>
                <div class="flex height-100">
                    <div class="option selected"><h4>Quick Info</h4></div>
                    <div class="option"><h4>Analytics</h4></div>
                    <div class="option"><h4>Settings</h4></div>
                </div>

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
    width: 392px;
    height: 46px;
    background-color: $color-light-blue-gray;
    border-radius: 10px;
    padding: 4px;


    .option {
        border-radius: 10px;
        color: $color-text-light;
        width: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

    }
}

.selector {
    position: absolute;
    width: 100px;
    height: 100px;
    background: white;
    z-index: 0;
}

</style>