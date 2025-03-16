<template>
  <div class="min-h-screen">
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
        <template v-if="pluginData">
          <component
            :is="block._block_name"
            v-for="(block, index) in pluginData.content_blocks"
            :key="index"
            :block="block"
          />
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import plugin from '~/plugin/plugin_system_data.json';

const pluginData = computed(() => plugin || {});

</script>