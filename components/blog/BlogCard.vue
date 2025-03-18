<template>
  <main>
    <div class="">
      <div class="w-100">
        <div>
          <NuxtLink class="text-reset text-decoration-none" :to="data._path">
            <div class="item-post-blog mb-3">
              <div class="item-post-blog-background"></div>
              <img
                class=" w-100 object-fit-cover ratio ratio-1x1"
                :src="data.thumbImg.image"
                :alt="data.thumbImg.image_alt"
              >
            </div>
          </NuxtLink>
          <div class="d-flex flex-column">
            <div class="d-flex align-items-start">
              <div style="border-color: var(--color-main-blog) !important;" class="border text-center p-2 w-fit font-weight-medium">
                <h3 class="fs-6 text-color-blog">{{ renderDateMonth(data.date).date }}</h3>
                <h3 class="fs-6 text-color-blog" >{{ renderDateMonth(data.date).month }}</h3>
              </div>
              <div class="ms-2">
                <NuxtLink class="text-reset text-decoration-none" :to="data._path">
                  <span class="mb-2 fs-5 fw-bold text-main line-clamp-2">
                    {{ data.title }}
                  </span>
                </NuxtLink>
                <div
                  class=" fs-6 text-color-blog font-weight-medium ckeditor-custom line-clamp-2 mb-2"
                  v-html="data.desc"
                />
                <div v-if="data?.category?.length === 1 && data?.category[0]?.text">
                  <span class="mb-2 text-start fs-6  color_sub_title">Posted in:
                  </span>
                  <NuxtLink v-for="post, i in renderCateOrTag(data, 'category')" :key="i" :to="post._path" :target="post?.open_new_tab ? '_blank': ''" class="me-1 text-reset text-decoration-none">
                    <span class="hover-underline text-start fs-6  color_sub_title">
                      {{ post.text }}</span>
                  </NuxtLink>
                </div>
                <div v-else-if="data?.category?.length > 0">
                  <span class="mb-2 text-start fs-6  color_sub_title">Posted in:
                  </span>
                  <NuxtLink v-for="post, i in renderCateOrTag(data, 'category')" :key="i" :to="post._path" :target="post?.open_new_tab ? '_blank': ''" class="me-1 text-reset text-decoration-none">
                    <span class="hover-underline text-start fs-6  color_sub_title">
                      {{ post.text }}
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useBlogPageHelpers } from '~/composables/useBlogPage';
interface Props {
  data: any
}
const { data } = defineProps<Props>()
const { renderDateMonth, renderCateOrTag } = useBlogPageHelpers()
</script>
<style lang="scss" scoped>
  .item-post-blog {
    position: relative;
  .item-post-blog-background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    right: 0;
    background-color: #000;
    opacity: 0;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  &:hover {
    .item-post-blog-background {
      opacity: 0.3;
    }
  }
}

.color_sub_title{
  color: var(--color-text-blog);
}

</style>
