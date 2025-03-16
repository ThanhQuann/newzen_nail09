<template>
  <div>
    <h3 class="text-main h5 font-weight-bold mb-2">Search</h3>
    <div class="position-relative w-100 border mb-4 mb-lg-7">
      <span class="position-absolute top-50 start-0 bg-main"
        style="height: 2px; width: 20%; transform: translateY(-50%);"></span>
    </div>
    <form class="d-flex justify-content-center align-items-center gap-2" style="height: 36px;" @submit.prevent="handleSubmit">
      <input v-model="value" class="form-control h-100 " type="text"
      
        placeholder="Search" >
        
      <button type="submit" class="btn btn-primary bg-main px-3 h-100 py-2 d-flex justify-content-center align-items-center">
        <!-- <Icon name="i-heroicons-magnifying-glass" class="text-sm text-white font-weight-bold" /> -->
        <i class="bi bi-search"></i>
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import LANGUAGES from '@/data/lang-setting.json';
const search = useCounterStore()
const route = useRoute()
const router = useRouter()
const pathQuery = ref('/');
const blockStore = useCounterStore()

const posts = ref(blockStore.posts);

const countries = LANGUAGES.map((lang: any) => {
  return {
    name: lang.label,
    value: lang.value,
    enable: lang.isDefault
  };
});

const excludedRoutesName = () => {
  const excludedRoutesName = ['blog-category-slug', 'blog-tags-slug', 'blog']
  if(blockStore.lang !== '/'){
    const slicing = (blockStore.lang.slice(1, -1))
    excludedRoutesName.push(`${slicing}-blog-category-slug`,`${slicing}-blog-tags-slug`,`${slicing}-blog`)
  }
  return excludedRoutesName
};

const existPath = excludedRoutesName().includes(route.name)

const getPathQuery = (slug: any) => {
  if (slug && countries.some((item: any) => item.value === slug[0]) && countries) {
    return `/${slug[0]}/`;
  } else {
    return '/';
  }
};

const value = ref(search.title)

const filterPostsByTitle = (allPosts: any, searchTitle: string) => {
  const value = searchTitle.toLowerCase().replace(/\s+/g, '')
  return allPosts.filter((post: any) =>
    post.title.toLowerCase().replace(/\s+/g, '').includes(value)
  );
};

const handlePushQuery = (path = route.path) => {
  const searchTitle = value.value.toLowerCase().replace(/\s+/g, '');
  const page = route.query.page ? 1 : undefined;
  router.push({ path, query: { page, search: searchTitle } });
};

const handleSubmit = () => {
  if (value.value === '' && existPath) {
    search.searchActions('');
    blockStore.blockActions(blockStore.posts)
    if (route.query.search) {
      const newQuery = { ...route.query }
      delete newQuery.search;
      navigateTo({ path: route.path, query: newQuery })
    }
    return
  }
  handlePushQuery()
  if (value.value !== '' && !existPath) {
    navigateTo(`${pathQuery.value}blog`)
    handlePushQuery('/blog')
  }
  search.searchActions(value.value)
}

watch(() => route.query.search, (searchTitle: any) => {
  value.value = searchTitle
  if (route.query.search) {
    blockStore.blockActions(filterPostsByTitle(posts.value, searchTitle))
  } else {
    blockStore.blockActions(blockStore.posts)
  }
}, { immediate: true })

watch(() => route?.params?.slug, (newSlug) => {
  if (!existPath) {
    search.searchActions('');
    value.value = ''
  }
  pathQuery.value = getPathQuery(newSlug);
}, { immediate: true });

</script>
<style lang="scss" scoped>
  .input_search {
    // text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-main
  }
</style>
