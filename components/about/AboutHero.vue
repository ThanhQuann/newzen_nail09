<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="pd"
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{ background: block.background }"
  >
    <div>
      <div class="my__container row z-1 position-relative">
        <div class="p-2">
          <div
            class="heading-item text-center fs-5 fw-normal fontMontserrat colortx1"
            style="text-transform: uppercase"
            v-html="block.heading"
          ></div>
        </div>
        <div class="p-2">
          <h2
            class="title-item text-center fs-1 fw-bold fontMontserrat colortx1"
            v-html="block.title"
          ></h2>
        </div>
        <div class="p-2">
          <div class="desc-item" v-html="block.content"></div>
          <!-- <div class="desc-item" v-html="block.desc_start"></div>
          <ol class="">
            <li v-for="(item, index) in block.list_item" :key="index">
              <div v-html="item.para"></div>
            </li>
          </ol>
          <div class="desc-item" v-html="block.desc_end"></div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.pd {
  position: relative;
  overflow: hidden;
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  padding: 7em 0em 1em 0em;
  background: var(--color-primary);

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--color-primary);
    opacity: 0.7;
    z-index: 0;
  }
}

li {
  margin-block-start: 0;
  margin-block-end: 0.9rem;
}
.desc-item {
  padding-bottom: 14px;
}
@media (max-width: 1024px) {
  .cus-img {
    width: 452px;
  }
}
@media (min-width: 768px) {
  .title {
    font-size: 6.25rem;
    font-weight: 600;
    line-height: 6.25rem;
  }
  .cus-img {
    width: 332px;
  }
}
</style>
