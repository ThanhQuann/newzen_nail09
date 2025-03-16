<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <h3 class="text-main h5 font-weight-bold mb-2">Recent posts</h3>
    <div class="position-relative w-100 border mb-4 mb-lg-7">
      <span class="position-absolute top-50 start-0 bg-main"
        style="height: 2px; width: 20%; transform: translateY(-50%);"></span>
    </div>
    <div>
      <div v-for="(item, index) in block" :key="index">
        <NuxtLink class="text-color-blog text-decoration-none" v-if="block.length > 0" :to="item._path">
          <div class="row mb-4">
            <div class="col col-3 d-flex align-items-center">
              <img class="img-fluid object-fit-cover" :src="item.thumbImg.image" :alt="item.thumbImg.image_alt">
            </div>
            <div class="col col-9">
              <div class="mb-2">
                <h2 class="line-clamp-2 text-color-blog" style="font-size: 0.875rem; font-weight: bold;">
                  {{ item.title }}
                </h2>
              </div>
              <div class="text-color-blog ckeditor-custom"
                style="font-size: 14px; line-height: 21px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 0.5rem;"
                v-html="item.desc"></div>
              <div class="d-flex align-items-center">
                <span class="text-color-blog" style="font-size: 0.875rem;">{{ renderDatePost(item.date) }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogPageHelpers } from '~/composables/useBlogPage';

const { renderDatePost } = useBlogPageHelpers()

const BlockStore = useCounterStore();

const block = ref(BlockStore.posts.slice(0, 4));

watch(
  () => BlockStore.posts,
  (newValue) => {
    block.value = newValue.slice(0, 4);
  },
  { immediate: true }
);
</script>
