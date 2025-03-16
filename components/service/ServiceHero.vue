<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="py position-relative"
    v-if="block.status"
    :data-cms-bind="dataBinding"
  >
    <div
      class="my__container position-relative"
      style="border-radius: 30px 30px 30px 30px; opacity: 0.3s"
      :style="{
        backgroundImage: `url(${block.background_image})`,
        backgroundColor: block.background_color,
      }"
    >
      <div class="text-center">
        <div>
          <img style="margin-top: -50px" :src="block.image_double_heart" />
        </div>

        
 
      </div>

    <div class="pd">
       <div class="swiper-container" >
        <!-- :autoplay="{delay: 5000, disableOnInteraction: false,}" -->

          <swiper
              class="relative swiper__hover w-100 " 
              style="overflow: hidden;"
              :slidesPerView="1"
              :modules="modules"
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }"
              :pagination="{ clickable: true, el: '.swiper-pagination' }"
              :loop="true"
              :centeredSlides="true"
              @swiper="onSwiper"
            >
                <swiper-slide v-for="(item, index) in block.list_review" class="">
                   <div style="margin-top:30px;margin-bottom:30px">
                      <div class="review-content ">
                          <div >
                            <div style="font-size:24px " class="desc fst-italic" v-html="item.desc"></div>
                            <div class="cus-mb d-flex w-100  align-items-center justify-content-between ">
                                <div class="d-flex align-items-center justify-content-center">
                                   <div class="d-flex">
                                      <img class="avatar" style="border-radius: 50%;" :src="item.image_acount" />
                                      <div class="info ms-2">
                                        <div style="color:#FCC5C0;"  class="username fw-bold">{{ item.username }}</div>
                                        <div style="font-size:14px"  class="time colortx2">{{ item.position }}</div>
                                      </div>
                                   </div>
                                  </div>
                                  <div class="logo ">
                                    <img :src="block.image_logo" alt="" />
                                  </div>   
                            </div>
                               <i v-for="n in item.star" :key="n" class="bi bi-star-fill" style="color:#f6bb06"></i>
                          </div>
                          </div>
                        </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

       </div>
    </div>
    </div>
 
  </section>
</template>
<!-- </div>     
<div v-html="block.desc"></div>
</div> -->
<script lang="ts" setup>
import {ref} from 'vue'
import { Autoplay, EffectFade,Navigation,Pagination  } from 'swiper/modules';
const swiperInstance = ref();
const activeSlide = ref(0);
const modules = [Autoplay, EffectFade,Navigation,Pagination ]

const onSwiper = (e: any) => {
  swiperInstance.value = e;
};

const onSlideChange = () => {
  activeSlide.value = swiperInstance.value.realIndex;
};

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.swiper-container {
  display: flex;
  justify-content: center;
}

.swiper-pagination {
  position: absolute;
  bottom: 10px;
  top:80%;
  right: 50%;
  transform: translateX(48%);
  display: flex;
  gap: 10px;
}
:deep(.swiper-pagination-bullet-active) {
  background: #FCC5C0 !important;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #ddd;
  border-radius: 50%;
  transition: background 0.3s;
}

.review-content {
  width: 695px !important; /* Đặt width cố định */
  margin:0 auto;
  text-align: center;
  padding-bottom:170px;
}
.d-flex{
  margin-top: 25px;
  width: 100%;
  justify-content: center;
  text-align: left;
  align-items: center;

}

.avatar {
  border-radius: 50%;
 
}

.py {
  padding-top: 9rem !important;
  padding-bottom: 9rem !important;
}



.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 20px;
  height: 40px;
  color: #FCC5C0 ;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.swiper-button-prev {
  left: 40px;
  
}

.swiper-button-next {
  right: 40px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px;
}
@media (max-width: 1024px){
  .py{
    padding-bottom: 0 !important;
  }
}
@media (max-width: 568px) {
  .review-content{
    max-width: 302px !important; 
  }
  .cus-mb{
    margin-top: 0 ;
  }
  .swiper-pagination{
    right: 50%;
    transform: translateX(40%);
  }
}
</style>
