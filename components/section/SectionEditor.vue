<template>
  <section 
      v-if="block.status" 
      :style="{background:block.background_color}" 
      :data-cms-bind="dataBinding" 
      class="py-4"
  >
    <div class="container-md">
      <!-- eslint-disable -->
      <div class="ckeditor-custom" v-html="block.content" />
      <!-- eslint-enable -->
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>();
</script>
