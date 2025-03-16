<template>
    <main>
      <template v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component
          :is="formattedPage.content_blocks[0]._block_name"
          :block="formattedPage.content_blocks[0]"
          :data-binding="`#content_blocks`"
        />
      </template>
      <div :style="backgroundComputed">
        <BlogHero :itemsPerPage="itemsPerPage" v-slot="{data}" >
          <div class="row g-5" >
            <BlogCard class="col-md-6" v-for="item,index in data" :key="index" :data="item"/>
          </div>
        </BlogHero>
        <template v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
          <component
            :is="block._block_name"
            v-for="(block, index) in formattedPage.content_blocks?.slice(1)"
            :key="index"
            :block="block"
            :data-binding="`#content_blocks.${index}`"
          />
        </template>
      </div>
    </main>
  </template>
  
  <script lang="ts" setup>
  
  import { useNewzenPage } from '~/composables/useNewzenPage';
  import { useFetchBlogContent } from '~/composables/useBlogPage';

  const { contentBlog } = await useFetchBlogContent()

  const pageDataBlog = contentBlog.value;
  
  const {formattedPage } = useNewzenPage(pageDataBlog)
    
  const itemsPerPage = computed(()=> {

    if (!formattedPage.value?.items_per_page || formattedPage.value?.items_per_page <= 1) return 6

    return formattedPage.value?.items_per_page

  })

  const backgroundComputed = computed(() =>
  formattedPage.value?.background_image
    ? {
        background: `url(${formattedPage.value?.background_image}) center / cover` || 'unset'
      }
    : { backgroundColor: formattedPage.value?.background_color || 'unset' }
  );

  </script>
  <style lang="scss" scoped>

  </style>
  