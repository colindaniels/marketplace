<template>
  <div class="flex">
    <Sidebar />
    <main>
      <slot />
    </main>

  </div>
</template>
  
<script setup>
</script>
  
<style lang="scss" scoped>
main {
  width: 100%;
}
</style>