<template>
    <div class="flex-col gap-40">
        <div class="flex-col gap-20">
            <div class="flex-col gap-10">
                <h5 class="weight-semi-bold">Reccommended Category</h5>
                <SlideBtn @selected="selectCategory" type="unique" :values="reccommended_category" :current_value="selected_cateogy"/>
            </div>
            <div class="flex-col gap-10">
                <h5 class="weight-semi-bold">Similar Category</h5>
                <SlideBtn @selected="selectCategory" type="unique" :values="similar_categories" :current_value="selected_cateogy" />
            </div>
        </div>
        <h5 class="link left-auto right-auto color-text-light">Continue without category</h5>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits()
const reccommended_category = ref(['Cellphones & Smartphones'])
const similar_categories = ref(['Cellphone Accessories', 'Cellphone & Smartphone parts', 'Another Example'])
const selected_cateogy = ref('')
function selectCategory(category: any) {
    selected_cateogy.value = category;
    emit('nextStep')
}

</script>

<style scoped lang="scss"></style>