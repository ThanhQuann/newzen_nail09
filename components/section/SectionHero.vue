<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="bg-img"
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{ backgroundImage: `url(${block.background_image})` }"
  >
    <div class="section_hero container-xl">
      <div  class="row reverse-mb">
        <!-- content left -->
        <div style="height: 650px;" 
        class="col-md-6 col-sm-12 position-relative d-flex flex-wrap align-content-center align-items-center cus-title">
          <div
            class="title mb-md-3 mb-2 ckeditor-custom font__RED  pd-mb"
            v-html="block.title"
          ></div>
          <div
            class=" mb-2 ckeditor-custom color-content"
            v-html="block.content"
          ></div>
          <NuxtLink
            v-if="block.button.is_show"
            class="py-md-3 button--hover px-md-5 py-2 px-4 text-center d-flex rounded-pill d-mb cus-bt position-relative z-2"
            :to="block.button.link"
            :target="block.button?.open_new_tab ? '`_blank`' : ''"
            :style="{ backgroundColor: block.button.background_color }"
            style="display: inline-flex !important;"
          >
            <span
              class="button-text text-decoration-underline"
              :style="{ color: block.button.color }"
              >{{ block.button.text }}</span
            >
          </NuxtLink>
          <img
            class="icon-line"
            :src="block.image_lines"
            style=""
            alt="Icon alt"
          />
        </div>
        <!-- content right -->
    
        <div class="col-md-6 col-sm-12 position-relative cus-mb">
          <img class="wd-ipm position-relative z-2" style="object-fit: cover" :src="block.image" :alt="block.alt" />
              <div class="animation">
                  <img style="top:20px" class="icon-blue_rounded position-absolute" :src="block.image_blue_rounded" alt="Icon alt" />
                  <img style="width: 124px;top:2%;right:0;" class="icon-rounded-two position-absolute" :src="block.image_double_rounded" alt="Icon alt" />

              </div>      
              <img class="icon-rounded" :src="block.image_rounded" alt="Icon alt" />
        </div>
      </div>

      <!-- <img class="p" style="object-fit: cover; ":src="block.image" :alt="block.alt">
      <div
        class="container-md w-100 mx-auto justify-content-centers d-flex flex-col align-items-center z-2 top-0 start-0 end-0 bottom-0 container-xl	">
        <div style="max-width: 535px;">
          <div class="title mb-md-3 mb-2 ckeditor-custom font__RED" v-html="block.title"></div>
          <div class="mb-md-5 mb-2 ckeditor-custom color-content" v-html="block.content"></div>
        
        </div>
      </div>
     -->
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const { dataBinding, block } = defineProps<Props>();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px 300px 0px" }
  );

  const items = document.querySelectorAll(".animation_left, .animation_in");

  items.forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style lang="scss" scoped>

.icon-blue_rounded{
  width: 636px;
}
.title {
  font-size: 55px !important;
  font-weight: 700;
  max-width: 515px;
  font-family: "Montserrat", Sans-serif;
  margin-bottom: 20px !important;
}

.bg-img {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 128px;
  padding-bottom: 128px;
}
.color-content {
  color: var(--color-text);
  font-size:18px;
  max-width: 515px;
  margin-bottom: 34px !important;
}

.button-text {
  display: block !important;
  font-size: 18px;
}
.container-xl {
  max-width: 1140px !important;
}
.icon-line {
  position: absolute;
  bottom: -8%;
  left: 14%;
}
.icon-rounded {
  position: relative;
  bottom: 220px;
  left: -130px;
  z-index: -1;
}
@media (max-width: 1024px){
  .my__container{
    padding: 10px;
  }
 .title{
  font-size: 32px !important;
  margin-top: -70px;
  margin-bottom: 34px !important;

 }
 .wd-ipm{
    width: 514px;
    height: 551px;
   
  }
  .icon-line{
    bottom: 2%;
  }
  .icon-blue_rounded{
    top: 0 !important;
    margin-top: 40px;
    width: 572px;
    height: 511px;
  }
   .color-content{
     margin-bottom: 34px !important;
     font-size: 16px;
   }
   .bg-img{
    padding-bottom: 0 !important; 
  }

}
@media (max-width: 768px) {
  .title {
    font-size: 32px !important;
    font-weight: 600;
    max-width: 350px;
    line-height: 48px;
  }
  .wd-ipm{
    width: 386px;
    height: 414px;
  }
  .color-content{
    font-size: 16px;
    max-width: 340px;
    max-width: 394px;
    margin-bottom: 34px !important;
  }
  .icon-line{
    bottom: -7%;
    left: 22%;
  }
  .icon-blue_rounded{
    top: -32px !important;
    width: 395px;
    height: 407px;
    left: 68px;
  }
  .cus-title{
    height: 434px !important;
  }
  .bg-img{
    padding-bottom: 0 !important; 
  }
}
@media (max-width: 576px)
{
  .reverse-mb{
    flex-direction: column-reverse;
  }
  .cus-mb{
    margin-top: 28px;
    height: 422px;
  }
  .title{
    max-width: 394px;
    text-align: center;
  }
  .cus-title{
    height: 100% !important;
  }
  .cus-bt{
    display: block !important;
     width: 394px;
     justify-content: center;
     height: 58px;
     align-items: center;
  }
  .icon-line{
    bottom: -24%;
    left: 18%;
  }
  .pd-mb{
    margin: 1em 0em 1em 0em !important;
  }
  .color-content{
    margin-bottom: 34px !important;
      text-align: center;

  }
}

</style>
