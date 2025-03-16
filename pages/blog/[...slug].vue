<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <main>
    <template
      v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
      <component :is="formattedPage.content_blocks[0]._block_name" :block="formattedPage.content_blocks[0]"
        :data-binding="`#content_blocks`" />
    </template>
    <div :style="backgroundComputed">
      <BlogHero v-slot="{ data }">
        <div class="position-relative">
          <div class="w-100 d-flex flex-column justify-content-center align-items-center">
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-start py-3">
                <div  class="border text-center p-2" style="width: fit-content; font-weight: 500;border-color: var(--color-primary) !important;">
                  <h3 class="fs-6 text-color-blog">{{ renderDateMonth(pageData.date).date }}</h3>
                  <h3 class="fs-6 text-color-blog">{{ renderDateMonth(pageData.date).month }}</h3>
                </div>
                <div class="ms-2">
                  <div class="text-main text-lg font-khand text-start font-weight-bold ckeditor-custom"
                    v-html="pageData.title"></div>
                  <div class="block">
                    <span class="mb-2 start fs-6 text-color-blog">Posted in: </span>
                    <NuxtLink v-for="item, i in renderCateOrTag(pageData, 'category')" :key="i"
                      :target="item?.open_new_tab ? '_blank' : ''" :to="item._path"
                      class="p-1 start fs-6 d-inline-block text-color-blog text-decoration-none">
                      {{ item.text }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div class="d-flex font-khand align-items-center gap-2 md-text-16 text-15 md-leading-2 leading-1">
                <NuxtLink v-if="pageData.author.text" :to="pageData.author.url"
                  class="transition-all text-base text-color-blog text-decoration-none font-weight-bold duration-300 hover-text-gray-500">
                  {{ pageData.author.text }}
                </NuxtLink>
                <span v-if="pageData.author.text" class="separator text-color-blog">•</span>
                <div v-if="renderDatePost(pageData.date)"
                  class="d-flex justify-content-center align-items-center gap-2">
                  <span class="d-block text-base font-weight-semibold text-color-blog">{{ renderDatePost(pageData.date)
                    }}</span>
                </div>
              </div>
              <div class="text-start lg-py-4 py-2  text-color-blog font-weight-medium italic text-14 ckeditor-custom"
                v-html="pageData.desc"></div>
              <div class="text-20 leading-28">
                <div class="font-khand text-18 leading-1.5 mb-4 ckeditor-custom" v-html="pageData.content"></div>
              </div>
            </div>
            <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
              data-width="100%" data-numposts="1"></div>
          </div>
        </div>
        <div v-if="'tags' in formattedPage && formattedPage?.tags?.length > 0">
          <div class="position-relative w-100 border">
            <span class="position-absolute top-50 start-0 bg-main h-1"
              style="width: 20%; transform: translateY(-50%);"></span>
          </div>
          <div class="d-flex justify-content-start mt-4  align-items-start gap-3">
            <h3 class="text-main fs-5 font-weight-bold">Tags</h3>
            <div class="d-flex gap-2 justify-content-start align-items-center flex-wrap">
              <NuxtLink v-for="item, i in renderCateOrTag(pageData, 'tags')" :key="i" :to="item._path"
                :target="item?.open_new_tab ? '_blank' : ''"
                class="cursor-pointer text-reset text-decoration-none rounded bg-main text-white text-decoration-none d-inline-block py-1 px-2 w-auto"
                style="transition: opacity 0.3s; opacity: 1;">
                {{ item.text }}
              </NuxtLink>
            </div>
          </div>
          <div v-if="activeRelatedPost" class="row w-100 mt-4 g-3">
            <BlogCard v-for="item, index in listRelate" :key="index" :data="item" class="col-md-4 m-0" />
          </div>
        </div>
      </BlogHero>
      <template
        v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component :is="block._block_name" v-for="(block, index) in formattedPage.content_blocks?.slice(1)" :key="index"
          :block="block" :data-binding="`#content_blocks.${index}`" />
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useNewzenPage } from '~/composables/useNewzenPage';
import { useBlogPageHelpers, useFetchBlogContent } from '~/composables/useBlogPage';

const {
  renderDateMonth,
  renderCateOrTag,
  renderDatePost
} = useBlogPageHelpers();
const { contentBlog } = await useFetchBlogContent();
const { page } = useContent();
const blockStore = useCounterStore();

const posts = ref(blockStore.posts);
const pageData = page.value;
const listRelate = ref<any>(pageData);

const formattedPage = ref<any>();

if (!('tags' in formattedPage)) {
  formattedPage.value = useNewzenPage(pageData)?.formattedPage?.value
} else {
  formattedPage.value = useNewzenPage(pageData?.publish && pageData)?.formattedPage?.value
}

if (formattedPage.value?.tags) {
  const tagsPost = formattedPage.value?.tags
  const filterTags = tagsPost.map((tag: any) => tag.text);
  const filteredData = posts.value.filter(item =>
    item.tags?.some((tag: any) => filterTags.includes(tag.text) && item._path !== formattedPage.value._path)
  );

  function getRandomItems(arr: any[], count: number) {
    if (!Array.isArray(arr) || arr.length < 3) {
      return arr || [];
    }
    const result = new Set();
    while (result.size < count) {
      result.add(arr[Math.floor(Math.random() * arr.length)]);
    }
    return Array.from(result);
  }

  listRelate.value = getRandomItems(filteredData, 3);
}

const activeRelatedPost = computed(() => contentBlog.value?.related_post || false);

const backgroundComputed = computed(() =>
  contentBlog.value?.background_image
    ? { background: `url(${contentBlog.value.background_image}) center / cover` }
    : { backgroundColor: contentBlog.value?.background_color || 'unset' }
);
</script>

<style lang="scss"></style>
