<template>
  <div v-if="Category?.length > 0">
    <h3 class="text-main h3 font-weight-bold mb-2">Category</h3>
    <div class="position-relative w-100 border mb-3">
      <span class="position-absolute top-50 start-0 bg-main"
        style="height: 2px; width: 20%; transform: translateY(-50%);"></span>
    </div>
    <div class="d-flex flex-column">
      <NuxtLink v-for="(item, index) in Category" :key="index" :target="item?.open_new_tab ? '_blank' : ''"
        :to="`${pathQuery}blog/category${item._path}`"
        class="text-capitalize cursor-pointer transition-all duration-300  text-decoration-none text_link_block"
        :class="route.path === `${pathQuery}blog/category${item._path}` ? 'text-main' : 'text-color-blog'">
        {{ item?.text }} ({{ CountPostCategory(item?.text) }})
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const blogStore = useCounterStore()
const route = useRoute();

const posts = ref(blogStore.posts);

const pathQuery = computed(()=>{
  return blogStore.lang
});

const removeDuplicates = (array: any[]) => {
  if (array.length === 0) {
    return array
  };
  return [...new Map(array.map((item: any) => [item.text.toLowerCase().trimEnd(), item])).values()];
};

const CountPostCategory = (item: string) => {
  const listPosts: any[] = [];
  let newArray: any
  posts.value.forEach((post: any) => {
    if ('category' in post) {
      newArray = removeDuplicates(post?.category)
      newArray.forEach((value: any) => {
        if (typeof value?.text === 'string' && value?.text.toLowerCase().trimEnd() === item.toLowerCase().trimEnd()) {
          listPosts.push(post);
        }
      })
    }
  });
  return listPosts.length
}
const Category: any = blogStore.category

</script>

<style lang="scss" scoped>
.text_link_block:hover{
  color: var(--color-primary) !important;
}
</style>
