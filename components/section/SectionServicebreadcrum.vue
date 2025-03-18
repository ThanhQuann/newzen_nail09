<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="py-2 cus-bg"
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{ backgroundImage: `url(${block.background_image})` }"
  >
    <div class="">
      <h1
        :style="{ color: block.color }"
        class="heading fw-bold fontMontserrat"
        v-html="block.title"
      ></h1>
    </div>

    <div class="background-overlay"></div>
  </section>
</template>
<!-- </div>     
  </div> -->
<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
console.log(props);
</script>

<style lang="scss" scoped>
.cus-bg {
  min-height: 444px;
  margin-top: 100px;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-overlay {
  background-color: #fff;
  opacity: 0.23;
  transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
.heading {
  position: relative;
  font-size: 45px;
  line-height: 1.3em;
  &::after {
    content: "";
    position: absolute;
    width: 100px;
    background: #fcc5c0;
    height: 3px;
    margin-top: 30px;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
@media (max-width: 568px) {
  .heading {
    font-size: 32px !important;
  }

  .cus-bg {
    min-height: 0;
    height: 213px !important;
  }
}
</style>
