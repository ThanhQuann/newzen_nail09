<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    class="py position-relative mb"
    v-if="block.status"
    :data-cms-bind="dataBinding"
  >
     
<div class="position-relative">
  <div >
            <img class="img-mb position-absolute"  :src="block.image_double_heart" />
    </div>
   <div class="overflow-mb " style="overflow: hidden">
        <div
          class="my__container position-relative"
          style="border-radius: 30px 30px 30px 30px; opacity: 0.3s"
          :style="{
            backgroundImage: `url(${block.background_image})`,
            backgroundColor: block.background_color,
          }"
        >
  

    
            <!-- <div class="d-flex">
              <img style="width:40px;height:40px" :src="item.image_acount"/>
              <div class="info">
                  <div class="username" v-html="block.list_review[0].username"></div>
                  <div class="time" v-html="block.list_review[0].time"></div>
              </div>
              <div class="logo">
                <img :src="block.image_logo" alt="
              </div>
            </div>
           <div>
              <template v-for="(_, index) in block.list_review[0].star" :key="index">
                <i class="bi bi-star-fill"></i>
              </template>
               <div v-html="block.list_review[0].desc"></div>
            </div> -->
    
        <div class="pd">
              <swiper
                  class="relative swiper__hover w-100 swiper-mb " 
                  style="overflow: hidden;margin-top:60px"
                  :slidesPerView="1"
                  :spaceBetween="30"
                  :modules="modules"
                  :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }"
                  :autoplay="{delay: 50000000, disableOnInteraction: false,}"
                  :loop="true"
                  :breakpoints="{
                    1025: { slidesPerView:3 },
                    768: { slidesPerView:2 },
                    576: { slidesPerView:2 }
    
                  }"
                  @swiper="onSwiper"
                >
                      <swiper-slide v-for="(item, index) in block.list_review"  class="hover-pd">
                           <div class="review-item">
                              <div class="w-100 ">
                                  <div class="d-flex w-100  align-items-center justify-content-between ">
                                    <div class="d-flex align-items-center">
                                        <img class="avatar" style="width:40px;height:40px" :src="item.image_acount" />
                                        <div class="info ms-2">
                                          <div class="username fw-bold">{{ item.username }}</div>
                                          <div class="time">{{ item.time }}</div>
                                        </div>
                                      </div>
                                      <div class="logo ">
                                        <img :src="block.image_logo" alt="" />
                                      </div>   
                                </div>
                                   <i v-for="n in item.star" :key="n" class="bi bi-star-fill" style="color:#f6bb06"></i>
                                   <div 
                                  class="desc-container" 
                                >
                                  <div  
                                  :class="{ expanded: item.isExpanded }"
                                  style="font-size:15px;color:#000000"class="desc"
                                  ref="descRefs"
                                  v-html="item.desc"></div>
                                  <span 
                                  v-if="showReadMore[index]" 
                                  class="toggle-text" @click="toggleExpand(item)">
                                        {{ item.isExpanded ? "Hide" : "Read more" }}
                                </span>
                                </div>
                                </div>
                           </div>
                    </swiper-slide>
                </swiper>
                <strong style="font-size:14px" v-html="block.desc" class="d-flex justify-content-center mt-2 desc-mb"></strong>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
        </div>
    
      <img class="position-absolute postion-leaf" :src="block.image_leaf" alt="">
       
      </div>
  
   </div>
</div>
 
  </section>
</template>
<!-- </div>     
<div v-html="block.desc"></div>
</div> -->
<script lang="ts" setup>
import { Autoplay, EffectFade,Navigation } from 'swiper/modules';
const swiperInstance = ref();
const isExpanded = ref(false);
import { ref, onMounted, nextTick } from "vue";

const descRefs = ref<(HTMLElement | null)[]>([]);
const showReadMore = ref<boolean[]>([]);

const checkEllipsis = () => {
  nextTick(() => {
    showReadMore.value = descRefs.value.map((desc) => {
      if (!desc) return false;
      return desc.scrollHeight - desc.clientHeight > 1; // Chỉ hiển thị nút khi có nội dung bị cắt
    });
  });
};

onMounted(() => {
  checkEllipsis();
});


const activeSlide = ref(0);
const modules = [Autoplay, EffectFade,Navigation]

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
  const toggleExpand = (item:any) => {
    item.isExpanded = !item.isExpanded

};
</script>

<style lang="scss" scoped>
.desc-container {
  position: relative;
  width: 100%;
  transition: all 0.3s ease-in-out;
  
}

.desc {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Số dòng tối đa hiển thị */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 87px; /* Điều chỉnh theo font-size */
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.expanded {
  -webkit-line-clamp: unset;
  max-height: none;
}
.py {
  padding-top: 9rem !important;
  padding-bottom: 9rem !important;
 
}
.pd{
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    padding: 2em 5em 5em 5em;
}
.toggle-text{
  margin-top: 5px;
}

.review-item {
 
  min-height: 230px;
  padding: 20px;
  border-radius: 4px !important;
  border-top-width: 0px !important;
  border-bottom-width: 0px !important;
  border-left-width: 0px !important;
  border-right-width: 0px !important;
  background-color: #f4f4f4 !important;
  backdrop-filter: blur(0px);

}
.review-item{
  transition: margin 0.3s ease-in-out;
  
  &:hover {
    margin-top:-5px;
  }
}
.pd-20{
  padding: 20px;
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 20px;
  height: 40px;
  color: #C4C4C4;
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
.img-mb{
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}
.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px;
}
.postion-leaf{
  position: absolute;
  z-index: 1;
  right: -7%;
  bottom: -42%;
}
@media (max-width:1024px){
  .postion-leaf{
    right: -8%;
    bottom: -41%;
  }
  .review-item{
    background: transparent !important;
  }
  .py{
    margin-bottom: 0px !important;
    padding-bottom: 40px !important;
  }
}
@media (max-width:768px){
  .postion-leaf{
    right: -8%;
    bottom: -40%;
  }
  .py{
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: 7em 0 3em 0 !important;
  }
  .review-item{
    background: transparent !important;
  }
}
@media (max-width:576px){
  .review-item{
    background-color: transparent  !important;
    padding: 0 !important; 
  }
  .swiper-mb{
    width: 286px !important;
  }
  .img-mb{
    margin-top: 50px !important;
  }
  .swiper-button-prev{
    left: 20px;
  }
  .pd{
    min-height: 550px !important;
  }
  .swiper-button-next{
    right: 20px;
  }
  .desc-mb{
    margin-left: -45px;
    width: 382px !important;
  }
  .postion-leaf{
    right: -4%;
    bottom: -13%;
  }
  .review-item{
    background: transparent !important;
  }
  .img-mb{
    top: 0;
  }
  .swiper-mb{
    margin-top: 170px !important;
  }
}
</style>
