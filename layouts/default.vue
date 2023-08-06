<template>
  <div class="flex">
    <Sidebar/>
    <main>
      <slot></slot>
    </main>

  </div>
</template>
  
<script setup>
</script>
  
<style lang="scss" scoped>
main {
  width: 100%;
  padding-left: 45px;
  padding-bottom: 45px;
}
</style>