<template>
  <div>
    <div class="_dynamic_container"></div>

    <div>
      <input class="_dynamic_search_input" type="text" />
    </div>

    <ul></ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
._dynamic_container {
  background: white;
  border: 1px solid gray;
  width: 100%;
  height: 35px;
  border-radius: 0.5rem;
}

._dynamic_search_input {
  width: 100%;
  background: #f9fafb;
  padding: 9px;
}
</style>
