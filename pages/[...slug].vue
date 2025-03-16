<template>
  <main>
    <template v-if="formattedPage">
      <component
        :is="block._block_name"
        v-for="(block, index) in formattedPage.content_blocks"
        :key="index"
        :block="block"
        :data-binding="`#content_blocks.${index}`"
      />
    </template>
    <slot />
  </main>
</template>

<script lang="ts" setup>
import NewzenConnector from 'newzen-connector';
import 'newzen-connector/dist/style.css';

const route = useRoute();
const { page } = useContent();

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}
const pageData = page.value;

const head = generateHead(pageData, route);
useHead(head);

const formattedPage = ref(pageData.content_blocks ? NewzenConnector.formatContentBlock(pageData) : {});

const newzenCallback = (_formattedPage: any) => {
  formattedPage.value = _formattedPage;
}

const connector = new NewzenConnector({ initialData: formattedPage.value, callback: newzenCallback });

onMounted(() => {
  connector.actionHandler()
})

</script>
