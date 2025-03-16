<template>
  <main>
    <div class="container-lg py-4 py-lg-5">
      <NuxtLink v-if="route.path !== `${blockStore.lang}blog`" :to='`${blockStore.lang}blog`'
        class="btn text-reset text-decoration-none btn-primary bg-main rounded mb-4">
        <!-- <Icon name="i-heroicons-arrow-left-16-solid" class="text-white" /> -->
        <i class="bi bi-arrow-left"></i>
      </NuxtLink>
      <div class="row g-5">
        <BlogSearch class="mb-6 d-lg-none" />
        <div class="col-lg-8 d-flex flex-column justify-content-between">
          <div v-if="pagePosts.length === 0 && existPath" class="mt-4 text-center text-text-blog opacity-65 display-3">
            No results found
          </div>
          <slot :data="pagePosts" />
          <!-- <div class="mx-auto w-fit mt-6" :class="!(posts?.length > itemsPerPage) && 'flex-1'">
            <UPagination v-if="posts?.length > itemsPerPage" v-model="pagination" size="lg" :max="7" :page-count="1"
              :total="totalPagination" :prev-button="{ to: handleOnClickPagination(pagination - 1) }"
              :next-button="{ to: handleOnClickPagination(pagination + 1) }"
              :to="(page: number) => ({ query: { ...route.query, page } })" />
          </div> -->
          <nav v-if="posts?.length > itemsPerPage" class="mx-auto mt-4">
            <ul class="pagination">
              <li class="page-item" :class="pagination <= 1 ? 'disabled' : ''">
                <button class="page-link" @click="handleOnClickPagination(pagination - 1)" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li v-for="(item, index) in totalPagination" :class="pagination === index + 1 ? 'active' : ''"
                class="page-item"><button @click="handleOnClickPagination(index + 1)" class="page-link">{{ index + 1
                  }}</button></li>
              <li class="page-item" :class="pagination === totalPagination ? 'disabled' : ''">
                <button class="page-link" @click="handleOnClickPagination(pagination + 1)" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-4 border-start ps-4">
          <BlogSearch class="mb-4 d-none d-lg-block" />
          <BlogRecent class="mb-4" />
          <div class="sticky top-120">
            <BlogCategory class="mb-4" />
            <BlogTags />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>

interface Props {
  itemsPerPage: number
}

const { itemsPerPage } = defineProps<Props>()

const router = useRouter();
const route = useRoute();

const blockStore = useCounterStore();

const queryParamsPage = computed(() => {
  return Number(route.query.page) ? Number(route.query.page) * 1 : 1
})

const pagination = ref(queryParamsPage.value);

const currentPage = ref(queryParamsPage.value);

const totalPagination = computed(() => {
  return Math.ceil((posts.value?.length / itemsPerPage));
});

const posts = ref<any>(blockStore.block);

const handleOnClickPagination = (pagination: any) => {
  console.log('pagination ::', pagination);

  router.push({ path: route.path, query: { ...route.query, page: pagination } });
  return {
    path: route.path,
    query: { ...route.query, page: { page: pagination } }
  }
}

const pagePosts = computed(() => {
  return posts.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  );
});

const excludedRoutes = ['blog-category-slug', 'blog-tags-slug', 'blog'];

const existPath = excludedRoutes.includes(String(route.name));

const removeDuplicates = (array: any[]) => {
  return array.filter((item, index, self) =>
    index === self.findIndex((t: any) => t?.text?.toLowerCase() === item.text?.toLowerCase())
  );
};
function FilterPostsByRouteSlug(list: any, key: any) {
  const listFilter: any[] = [];
  let newArray: any[] = [];

  list.forEach((item: any) => {
    if (key in item && Array.isArray(item[key]) && item[key].length > 0) {
      newArray = removeDuplicates(item[key]);
      newArray.forEach((value: any) => {
        if (
          typeof value.text === 'string' &&
          value.text.toLowerCase().replace(/\s+/g, '-') ===
          route?.params?.slug.toString()
        ) {
          listFilter.push(item);
        }
      });
    }
  });
  return listFilter;
}

const filterPosts = () => {
  if (route.path.startsWith(`${blockStore.lang}blog/tags`)) {
    posts.value = FilterPostsByRouteSlug(posts.value, 'tags');
  } else if (route.path !== `${blockStore.lang}blog` && route.path !== `${blockStore.lang}blog/`) {
    posts.value = FilterPostsByRouteSlug(posts.value, 'category');
  }

  blockStore.totalPaginationAction(posts.value.length, itemsPerPage);
};

filterPosts();

watch(
  () => blockStore.block,
  (newValue) => {
    posts.value = newValue;
    filterPosts();
  },
  { immediate: true }
);

watch(
  () => route.path,
  () => {
    filterPosts();
  }
);

watch(
  () => route.query?.page,
  (newQuery) => {
    currentPage.value = newQuery ? Number(newQuery) : 1;
    pagination.value = currentPage.value;
  }
);
</script>

<style>
.pagination {
  --bs-pagination-active-color: #fff !important;
  --bs-pagination-color: #000000 !important;
  --bs-pagination-active-bg: var(--color-primary) !important;
  --bs-pagination-active-border-color: var(--color-primary) !important;
}

.bg-main-500 {
  background-color: var(--color-main) !important;
}

.p-2\.5 {
  padding: 9px !important;
}
</style>
