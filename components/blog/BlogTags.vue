<template>
  <div v-if="Tags?.length > 0">
    <h3 class="text-main font-weight-bold mb-2">Tags</h3>
    <div class="position-relative w-100 border mb-3">
      <span class="position-absolute top-50 start-0 bg-main"
        style="height: 2px; width: 20%; transform: translateY(-50%);"></span>
    </div>
    <div class="d-flex gap-2 justify-content-start align-items-center flex-wrap">
      <NuxtLink v-for="(item, index) in Tags" :key="index" :to="`${pathQuery}blog/tags${item._path}`"
        :target="item?.open_new_tab ? '_blank' : ''"
        class="rounded text-reset text-decoration-none bg-main text-white hover-opacity-80 transition-all duration-300 py-1 px-2 w-auto d-inline-block"
        style="padding: 0.5rem 1rem;">
        {{ item.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const blogStore = useCounterStore()

const Tags: any = blogStore.tags

const pathQuery = computed(()=>{
  return blogStore.lang
});
</script>
