<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="w-full background position-relative "
    :style="{ backgroundImage: `url(${block.background_image})` }"
  >
    <div
      class="cus-bg"
      :style="{ backgroundColor: block.background_color }"
    ></div>
    <div class="column-gap">
      <div class="my__container align-items-center d-flex">
        <div class="title">
          <div
            class="fz-45 fw-bold fontMontserrat cus-line position-relative"
            v-html="block.title"
          ></div>
        </div>
        <div class="image-set ">
          <img class="cus-img" style="height: auto;padding:20px" :src="block.image" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any
  block: any
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.first_items {
  &::after {
    content: ' /';
  }
}
.fz-45 {
  font-size: 45px;
}
.background {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 7em 0em 8em 0em;
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
}
.image-set {
  width: 40%;
  margin: 0em 2em -10em 0em;
}
.cus-img {
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 50% 50%;  
}

.cus-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  // opacity: 0.1;
}
.title{
  width: 60%;
}
.cus-line::after {
  content: '';
  position: absolute;
  width: 100px;
  display: inline-block;
  height: 2px;
  background: var(--color-primary);
  margin-top: 30px;
  top: 100%;
  left: 0;
}
@media (max-width: 1024px) {
 
  .title{
    width: 50% ;
  }
 
  .image-set{
    width: 50%;
  }
  .fz-45 {
    font-size: 34px !important;
  }
  .cus-bg {
    height: 478px;
  }
}
@media (max-width: 768px) {
  .title {
    font-size: 6.25rem;
    font-weight: 600;
    line-height: 6.25rem;
    width: 50%;
  }
  .image-set{
    width: 50%;
  }
  
  .cus-bg {
    height: 356px;
  }
  .fz-45 {
    font-size: 34px !important;
  }
}
@media (max-width: 568px) {
  .title{
    width: 100% !important;
    text-align: center ;
  }
  .image-set {
    display: none;
  }

  .line {
    display: flex;
    justify-content: center;
  }
  .cus-line {
    margin-top: 30px;
    text-align: center;
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
